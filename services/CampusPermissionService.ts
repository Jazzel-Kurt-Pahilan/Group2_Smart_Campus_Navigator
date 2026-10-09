// DATA LAYER: Centralized GPS permission access.
import * as Location from 'expo-location';
import { Linking } from 'react-native';

export type PermissionStatus = 'granted' | 'denied' | 'undetermined';

export type PermissionResult = {
  status: PermissionStatus;
  canAskAgain: boolean;
};

// Check the current foreground location permission.
export async function checkLocationPermission(): Promise<PermissionResult> {
  const { status, canAskAgain } =
    await Location.getForegroundPermissionsAsync();

  return {
    status: status as PermissionStatus,
    canAskAgain,
  };
}

// Request permission from the user.
export async function requestLocationPermission(): Promise<PermissionResult> {
  const { status, canAskAgain } =
    await Location.requestForegroundPermissionsAsync();

  return {
    status: status as PermissionStatus,
    canAskAgain,
  };
}

// Only request permission when the system allows another prompt.
export async function ensureLocationPermission(): Promise<PermissionResult> {
  const current = await checkLocationPermission();

  if (current.status === 'granted') {
    return current;
  }

  if (!current.canAskAgain) {
    return current;
  }

  return requestLocationPermission();
}

// Open the device settings for manually enabling permission.
export async function openLocationSettings(): Promise<void> {
  await Linking.openSettings();
}