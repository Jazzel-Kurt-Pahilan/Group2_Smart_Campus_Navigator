// DATA LAYER: talks directly to the device permission system (expo-location).
// No UI and no useState here, only functions that return a result.
import * as Location from 'expo-location';

export type PermissionStatus = 'granted' | 'denied' | 'undetermined';

export type PermissionResult = {
  status: PermissionStatus;
  canAskAgain: boolean; // false = the pop-up will not appear again (user must use settings)
};

export async function checkLocationPermission(): Promise<PermissionResult> {
  const { status, canAskAgain } = await Location.getForegroundPermissionsAsync();
  return { status: status as PermissionStatus, canAskAgain };
}

export async function requestLocationPermission(): Promise<PermissionResult> {
  const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();
  return { status: status as PermissionStatus, canAskAgain };
}

// Check first, and only show the pop-up if we are still allowed to ask.
export async function ensureLocationPermission(): Promise<PermissionResult> {
  const current = await checkLocationPermission();
  if (current.status === 'granted') return current;
  if (current.canAskAgain) return requestLocationPermission();
  return current;
}