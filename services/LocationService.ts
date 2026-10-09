// DATA LAYER: reads the device GPS through expo-location.
import * as Location from 'expo-location';
import { UserLocation } from '../types';

// True if the phone's location switch is on (permission can be granted while it is off).
export async function isLocationServicesEnabled(): Promise<boolean> {
  return Location.hasServicesEnabledAsync();
}

// Gets one GPS reading. Rejects if it takes longer than timeoutMs.
export async function getCurrentUserLocation(timeoutMs = 15000): Promise<UserLocation> {
  const position = await Promise.race([
    Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced }),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Location timeout')), timeoutMs)
    ),
  ]);

  return {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    accuracy: position.coords.accuracy,
  };
}

// Calls onUpdate every time the user moves a few meters. Returns a subscription to stop it.
export async function watchUserLocation(
  onUpdate: (location: UserLocation) => void
): Promise<Location.LocationSubscription> {
  return Location.watchPositionAsync(
    { accuracy: Location.Accuracy.High, distanceInterval: 3, timeInterval: 2000 },
    (position) =>
      onUpdate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      })
  );
}