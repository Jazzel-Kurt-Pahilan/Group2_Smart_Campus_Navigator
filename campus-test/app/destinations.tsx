// PRESENTATION LAYER: destination list screen (parent).
// It holds the search/filter state, asks the hooks for data, and passes everything down through props.
import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import DestinationFilters from '../components/destinations/DestinationFilters';
import DestinationList from '../components/destinations/DestinationList';
import NavigationButton from '../components/common/NavigationButton';
import { useUserLocation } from '../hooks/useUserLocation';
import { useDestinations } from '../hooks/useDestinations';
import { useFavorites } from '../hooks/useFavorites';
import { filterDestinations, sortByDistance } from '../utils/destinationFilters';
import { colors, spacing } from '../constants/theme';

export default function DestinationsScreen() {
  const router = useRouter();
  const { state } = useUserLocation();
  const location = state.status === 'ready' ? state.location : null;

  const { destinations } = useDestinations(location);
  const { favoriteIds, toggleFavorite } = useFavorites();

  const [query, setQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const visible = useMemo(
    () => filterDestinations(sortByDistance(destinations), query, favoritesOnly, favoriteIds),
    [destinations, query, favoritesOnly, favoriteIds]
  );

  // Go back to the map that is already open, and tell it which building was chosen.
  const handleSelect = (id: string) => {
    router.dismissTo({ pathname: '/map', params: { id } });
  };

  const subtitle =
    state.status === 'loading'
      ? 'Finding your location...'
      : location
        ? 'Sorted by nearest (straight-line distance)'
        : 'Location unavailable, so distances are hidden';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Campus destinations</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <DestinationFilters
        query={query}
        onQueryChange={setQuery}
        favoritesOnly={favoritesOnly}
        onFavoritesOnlyChange={setFavoritesOnly}
      />

      <View style={styles.list}>
        <DestinationList
          destinations={visible}
          favoriteIds={favoriteIds}
          emptyMessage={
            favoritesOnly
              ? 'No favorites yet. Tap the star on a building to save it.'
              : 'No buildings match your search.'
          }
          onSelect={handleSelect}
          onToggleFavorite={toggleFavorite}
        />
      </View>

      <NavigationButton label="Back to map" onPress={() => router.back()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: spacing.md, gap: spacing.md },
  header: { gap: 2 },
  title: { fontSize: 24, fontWeight: '700', color: colors.primaryDark },
  subtitle: { fontSize: 13, color: colors.textMuted },
  list: { flex: 1 },
});