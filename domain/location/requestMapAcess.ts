import { LocationPermissionDataSource as Permission } from '@/data/location/LocationPermissionDataSource';

export type MapAccessResult = {
  granted: boolean;
  message: string | null;
};

const MESSAGES = {
  denied:
    'Location access was denied. Enable it in your device settings to see nearby campus buildings.',
  error: 'Something went wrong while checking location access. Please try again.',
};

export async function requestMapAccess(): Promise<MapAccessResult> {
  try {
    let status = await Permission.getStatus();

    if (status !== 'granted') {
      status = await Permission.request();
    }

    return status === 'granted'
      ? { granted: true, message: null }
      : { granted: false, message: MESSAGES.denied };
  } catch {
    return { granted: false, message: MESSAGES.error };
  }
}

export const openLocationSettings = () => Permission.openSettings();