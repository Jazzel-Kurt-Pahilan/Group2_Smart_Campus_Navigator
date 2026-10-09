
import DestinationCard from '@/components/destinations/DestinationCard';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text
} from 'react-native';
import destinations from '../services/destinationService';

export default function DestinationsScreen() {
  const router = useRouter();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Back to Map button */}
      <Pressable
        style={styles.backButton}
        onPress={() => router.replace('/map')}
        accessibilityRole="button"
        accessibilityLabel="Back to Map"
      >
        <ArrowLeft size={20} color="#1E293B" />
        <Text style={styles.backText}>Back to Map</Text>
      </Pressable>

      <Text style={styles.title}>Campus Destinations</Text>

      {destinations.map((item) => (
        <DestinationCard
          key={item.id}
          name={item.name}
          number={item.number}
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
    backgroundColor: '#F8FAFC',
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 8,
    paddingVertical: 10,
    marginBottom: 20,
  },

  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0F172A',
  },
});
