import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin } from 'lucide-react-native';

export default function LocationCard({
  latitude,
  longitude,
  status = 'Location detected',
}) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <MapPin size={20} color="#F5B014" />

        <Text style={styles.title}>YOUR LOCATION</Text>
      </View>

      <Text style={styles.status}>{status}</Text>

      <View style={styles.coordinates}>
        <Text style={styles.label}>Latitude</Text>
        <Text style={styles.value}>
          {latitude !== null && latitude !== undefined
            ? latitude.toFixed(6)
            : '--'}
        </Text>
      </View>

      <View style={styles.coordinates}>
        <Text style={styles.label}>Longitude</Text>
        <Text style={styles.value}>
          {longitude !== null && longitude !== undefined
            ? longitude.toFixed(6)
            : '--'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },

  title: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },

  status: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 14,
  },

  coordinates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },

  label: {
    color: '#64748b',
    fontSize: 13,
  },

  value: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 13,
  },
});