// DATA LAYER: asks the device to open another app. Returns false if it could not.
import { Linking } from 'react-native';

export async function openExternalMap(url: string): Promise<boolean> {
  try {
    await Linking.openURL(url);
    return true;
  } catch {
    return false;
  }
}