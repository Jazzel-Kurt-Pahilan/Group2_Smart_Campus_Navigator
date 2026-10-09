import {
  ensureLocationPermission,
  openLocationSettings as openSettings,
} from '@/services/CampusPermissionService';

export type MapAccessResult = {
  granted: boolean;
  message: string | null;
};

const MESSAGES = {
  denied:
    'Location access was denied. Enable it in your device settings to see nearby campus buildings.',
  error:
    'Something went wrong while checking location access. Please try again.',
};

export async function requestMapAccess(): Promise<MapAccessResult> {
  try {
    const permission = await ensureLocationPermission();

    return permission.status === 'granted'
      ? { granted: true, message: null }
      : { granted: false, message: MESSAGES.denied };
  } catch {
    return { granted: false, message: MESSAGES.error };
  }
}

export const openLocationSettings = openSettings;
