// BUSINESS LAYER: the permission workflow (check, request, handle result).
// The screen only calls this and reacts to the answer.
import { useState } from 'react';
import { checkLocationPermission, ensureLocationPermission } from '../services/CampusPermissionService';
import { isLocationServicesEnabled } from '../services/LocationService';
import { LocationIssue } from '../types';

export function useLocationPermission() {
  const [checking, setChecking] = useState(false);

  // ask = true shows the pop-up if allowed; ask = false only checks quietly.
  const evaluate = async (ask: boolean): Promise<LocationIssue | null> => {
    setChecking(true);
    try {
      const { status, canAskAgain } = ask
        ? await ensureLocationPermission()
        : await checkLocationPermission();

      if (status !== 'granted') return canAskAgain ? 'denied' : 'blocked';
      if (!(await isLocationServicesEnabled())) return 'servicesOff';
      return null;
    } catch {
      return 'unavailable';
    } finally {
      setChecking(false);
    }
  };

  return {
    checking,
    requestAccess: () => evaluate(true),
    recheckAccess: () => evaluate(false),
  };
}
