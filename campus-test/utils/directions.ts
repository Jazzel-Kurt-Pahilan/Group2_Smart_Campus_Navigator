// BUSINESS LAYER: builds the link that opens an external maps app.
import { Platform } from 'react-native';

export function buildDirectionsUrl(latitude: number, longitude: number, label: string): string {
  const query = encodeURIComponent(label);
  return Platform.select({
    ios: `http://maps.apple.com/?ll=${latitude},${longitude}&q=${query}`,
    android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${query})`,
    default: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
  }) as string;
}