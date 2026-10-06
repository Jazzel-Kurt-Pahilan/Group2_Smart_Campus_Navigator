import { StyleSheet, Text, View } from 'react-native';

interface LocationDisplayProps {
  latitude: number | null;
  longitude: number | null;
}

export default function LocationDisplay({
  latitude,
  longitude,
}: LocationDisplayProps) {
  if (latitude === null || longitude === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Current Location</Text>

        <Text style={styles.unavailable}>
          Location unavailable
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Location</Text>

      <Text style={styles.coordinate}>
        Latitude: {latitude.toFixed(6)}
      </Text>

      <Text style={styles.coordinate}>
        Longitude: {longitude.toFixed(6)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  coordinate: {
    fontSize: 14,
    marginBottom: 4,
  },

  unavailable: {
    fontSize: 14,
    color: '#777',
  },
});