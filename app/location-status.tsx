import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import LocationStatus from '@/components/LocationStatus';

import {
  ensureLocationPermission,
  getPermissionMessage,
} from '@/services/PermissionService';

export default function LocationStatusScreen() {

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  // loading

  const loadLocationPermission = async () => {
    try {
      // start loading
      setLoading(true);

      // clear previous error
      setError(null);

      const permissionGranted =
        await ensureLocationPermission();

      // permission was denied
      if (!permissionGranted) {
        setError(
          'Location access was denied. Please enable location permission to use the campus navigator.'
        );

        return;
      }

    } catch (error) {
      // handle unexpected errors
      setError(
        'Something went wrong while getting your location. Please try again.'
      );
    } finally {
      // stop loading whether successful or unsuccessful
      setLoading(false);
    }
  };

  // initial
  useEffect(() => {
    loadLocationPermission();
  }, []);

  // loading/error
  if (loading || error) {
    return (
      <LocationStatus
        loading={loading}
        error={error}
        onRetry={loadLocationPermission}
      />
    );
  }

  // success
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>✓</Text>

      <Text style={styles.title}>
        Location Permission Granted
      </Text>

      <Text style={styles.message}>
        Your location permission is ready.
      </Text>

      <Text style={styles.note}>
        Current GPS location will be connected to
        the campus navigator.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  icon: {
    fontSize: 48,
    color: '#F5B014',
    marginBottom: 16,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },

  message: {
    color: '#E2E8F0',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 12,
  },

  note: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    maxWidth: 340,
  },
});