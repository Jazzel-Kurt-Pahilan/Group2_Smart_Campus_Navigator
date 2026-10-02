import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type LocationStatusProps = {
  loading: boolean;
  error: string | null;
  onRetry: () => void;
};

export default function LocationStatus({
  loading,
  error,
  onRetry,
}: LocationStatusProps) {
  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size="large"
          color="#F5B014"
        />

        <Text style={styles.title}>
          Getting your location...
        </Text>

        <Text style={styles.message}>
          Please wait while we determine your current location.
        </Text>
      </View>
    );
  }

  // error/deny permission state
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.icon}>📍</Text>

        <Text style={styles.title}>
          Location Unavailable
        </Text>

        <Text style={styles.message}>
          {error}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={onRetry}
        >
          <Text style={styles.buttonText}>
            Try Again
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },

  icon: {
    fontSize: 42,
    marginBottom: 12,
  },

  title: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },

  message: {
    color: '#E2E8F0',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },

  button: {
    backgroundColor: '#F5B014',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },

  buttonText: {
    color: '#020617',
    fontSize: 16,
    fontWeight: 'bold',
  },
});