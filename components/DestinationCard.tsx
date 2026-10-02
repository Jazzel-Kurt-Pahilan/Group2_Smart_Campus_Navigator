import { Pressable, StyleSheet, Text, View } from "react-native";

type DestinationCardProps = {
  name: string;
  category: string;
  onPress: () => void;
};

export default function DestinationCard({
  name,
  category,
  onPress,
}: DestinationCardProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
  },

  category: {
    marginTop: 4,
    color: "#666",
  },
});