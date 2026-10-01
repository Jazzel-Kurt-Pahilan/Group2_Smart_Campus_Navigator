import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Navigation } from 'lucide-react-native';

export default function DistanceDisplay({
  distance,
  destinationName = 'Selected Destination',
}) {
  // Convert the distance into a readable format
  const formattedDistance =
    distance === null || distance === undefined
      ? '--'
      : distance < 1000
        ? `${Math.round(distance)} m`
        : `${(distance / 1000).toFixed(2)} km`;

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Navigation
          size={22}
          color="#020617"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>
          DISTANCE TO
        </Text>

        <Text style={styles.destination}>
          {destinationName}
        </Text>

        <Text style={styles.distance}>
          {formattedDistance}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#F5B014',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },

  content: {
    flex: 1,
  },

  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 1,
  },

  destination: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },

  distance: {
    fontSize: 20,
    fontWeight: '900',
    color: '#F5B014',
    marginTop: 4,
  },
});