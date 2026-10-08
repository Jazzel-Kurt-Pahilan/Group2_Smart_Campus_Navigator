// BUSINESS LAYER: gets the user's position, keeps it updated, and reports loading / ready / error.
import { useCallback, useEffect, useRef, useState } from 'react';
import { checkLocationPermission } from '../services/CampusPermissionService';
import {
  getCurrentUserLocation,
  isLocationServicesEnabled,
  watchUserLocation,
} from '../services/LocationService';
import { LocationIssue, UserLocation } from '../types';

type LocationState =
  | { status: 'loading' }
  | { status: 'ready'; location: UserLocation }
  | { status: 'error'; issue: LocationIssue };

export function useUserLocation() {
  const [state, setState] = useState<LocationState>({ status: 'loading' });
  const subscription = useRef<{ remove: () => void } | null>(null);

  const stopWatching = useCallback(() => {
    subscription.current?.remove();
    subscription.current = null;
  }, []);

  const load = useCallback(async () => {
    stopWatching();
    setState({ status: 'loading' });
    try {
      const { status, canAskAgain } = await checkLocationPermission();
      if (status !== 'granted') {
        setState({ status: 'error', issue: canAskAgain ? 'denied' : 'blocked' });
        return;
      }
      if (!(await isLocationServicesEnabled())) {
        setState({ status: 'error', issue: 'servicesOff' });
        return;
      }
      const location = await getCurrentUserLocation();
      setState({ status: 'ready', location });
      subscription.current = await watchUserLocation((next) =>
        setState({ status: 'ready', location: next })
      );
    } catch {
      setState({ status: 'error', issue: 'unavailable' });
    }
  }, [stopWatching]);

  useEffect(() => {
    load();
    return stopWatching; // stop listening when the screen closes
  }, [load, stopWatching]);

  return { state, reload: load };
}
