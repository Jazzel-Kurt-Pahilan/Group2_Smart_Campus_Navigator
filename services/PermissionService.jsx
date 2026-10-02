// services/PermissionService.jsx
import * as Location from 'expo-location';

/**
 * BUSINESS LAYER — checks and requests location permission.
 * No UI, no useState here — just functions that return a result.
 */

export async function checkLocationPermission() {
  const { status } = await Location.getForegroundPermissionsAsync();
  return status; // 'granted' | 'denied' | 'undetermined'
}

export async function requestLocationPermission() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status;
}

// Convenience function: check first, only request if needed
export async function ensureLocationPermission() {
  let status = await checkLocationPermission();
  if (status !== 'granted') {
    status = await requestLocationPermission();
  }
  return status === 'granted';
}

// A user-friendly message based on status — Sonnia's ErrorMessage.jsx can use this
export function getPermissionMessage(status) {
  switch (status) {
    case 'granted':
      return null;
    case 'denied':
      return 'Location access was denied. Enable it in your device settings to see nearby campus buildings.';
    default:
      return 'We need your location to show nearby campus buildings.';
  }
}