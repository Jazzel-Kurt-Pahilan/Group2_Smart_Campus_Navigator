import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DestinationCard from "../../components/DestinationCard";
import destinations from "../../services/destinationService";

type Destination = {
  id: string;
  name: string;
  category: string;
};

export default function DestinationsScreen() {
  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Destinations</Text>

      {destinations.map((item) => (
        <DestinationCard
          key={item.id}
          name={item.name}
          category={item.category}
          onPress={() => setSelectedDestination(item)}
        />
      ))}

      {selectedDestination && (
        <View style={styles.selected}>
          <Text style={styles.selectedTitle}>
            Selected Destination
          </Text>

          <Text style={styles.selectedName}>
            {selectedDestination.name}
          </Text>

          <Text>{selectedDestination.category}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  selected: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#eee",
  },

  selectedTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },

  selectedName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
});