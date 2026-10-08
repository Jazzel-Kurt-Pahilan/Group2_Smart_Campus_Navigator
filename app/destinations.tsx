
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';
import DestinationCard from '../components/DestinationCard';
import destinations from '../services/destinationService';

export default function DestinationsScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Campus Destinations</Text>

      {destinations.map((item) => (
        <DestinationCard
          key={item.id}
          name={item.name}
          category={item.category}
          onPress={() => {
            router.navigate({
              pathname: '/map',
              params: { id: item.id },
            });
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
