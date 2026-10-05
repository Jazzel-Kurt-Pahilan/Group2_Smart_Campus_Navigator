// services/PermissionService.ts
import * as Location from 'expo-location';

export type PermissionStatus = 'granted' | 'denied' | 'undetermined';

export async function checkLocationPermission(): Promise<PermissionStatus> {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status as PermissionStatus;
}

export async function requestLocationPermission(): Promise<PermissionStatus> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status as PermissionStatus;
}

// Convenience function: check first, only request if needed
export async function ensureLocationPermission(): Promise<boolean> {
  let status = await checkLocationPermission();
  if (status !== 'granted') {
    status = await requestLocationPermission();
  }
  return status === 'granted';
}

// A user-friendly message based on status — used by ErrorMessage components
export function getPermissionMessage(status: PermissionStatus): string | null {
  switch (status) {
    case 'granted':
      return null;
    case 'denied':
      return 'Location access was denied. Enable it in your device settings to see nearby campus buildings.';
    default:
      return 'We need your location to show nearby campus buildings.';
  }
}