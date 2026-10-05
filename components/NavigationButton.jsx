import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Linking, Platform } from 'react-native';
import { Navigation } from 'lucide-react-native';

/**
 * PRESENTATION LAYER — reusable "Start Navigation" button.
 * Props: latitude, longitude, destinationName, label (optional)
 * Opens the device's native Maps app with directions to the destination.
 */
export default function NavigationButton({ latitude, longitude, destinationName, label = 'Start Navigation' }) {
  const openMaps = () => {
    const query = encodeURIComponent(destinationName);
    const url = Platform.select({
      ios: `maps:0,0?q=${query}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${query})`,
    });
    if (url) {
      Linking.openURL(url).catch(() => {
        // Fallback: open in browser if no maps app is available
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`);
      });
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={openMaps} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
      <Navigation stroke="#020617" size={16} strokeWidth={3} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F5B014',
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  text: {
    color: '#020617',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});