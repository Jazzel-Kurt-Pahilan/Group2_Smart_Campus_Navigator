import { StyleSheet, Text, View } from 'react-native';

interface DistanceDisplayProps {
  distance: number | null;
  destinationName?: string;
}

export default function DistanceDisplay({
  distance,
  destinationName,
}: DistanceDisplayProps) {
  if (distance === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {destinationName ?? 'Destination'}
        </Text>

        <Text style={styles.unavailable}>
          Distance unavailable
        </Text>
      </View>
    );
  }

  const formattedDistance =
    distance < 1000
      ? `${Math.round(distance)} m`
      : `${(distance / 1000).toFixed(2)} km`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {destinationName ?? 'Destination'}
      </Text>

      <Text style={styles.distance}>
        {formattedDistance}
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
    marginBottom: 6,
  },

  distance: {
    fontSize: 16,
    fontWeight: '600',
  },

  unavailable: {
    fontSize: 14,
    color: '#777',
  },
});