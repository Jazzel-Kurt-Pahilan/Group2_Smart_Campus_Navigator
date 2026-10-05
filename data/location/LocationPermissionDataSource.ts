import * as Location from 'expo-location';
import { Linking } from 'react-native';

export type PermissionStatus = 'granted' | 'denied' | 'undetermined';

export const LocationPermissionDataSource = {
  async getStatus(): Promise<PermissionStatus> {
    const { status } = await Location.getForegroundPermissionsAsync();
    return status as PermissionStatus;
  },

  async request(): Promise<PermissionStatus> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status as PermissionStatus;
  },

  openSettings(): Promise<void> {
    return Linking.openSettings();
  },
};