import { useCallback, useState } from 'react';
import {
    openLocationSettings,
    requestMapAccess,
} from '../domain/location/requestMapAcess';

export function useMapAccess() {
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Resolves true if the user may proceed to the map. */
  const requestAccess = useCallback(async (): Promise<boolean> => {
    if (checking) return false;

    setChecking(true);
    setError(null);

    const result = await requestMapAccess();

    setError(result.message);
    setChecking(false);
    return result.granted;
  }, [checking]);

  return { checking, error, requestAccess, openSettings: openLocationSettings };
}