// PRESENTATION LAYER: map screen (parent). It gets results from the hooks and the routing utilities,
// decides what to show, and passes data to the components through props.
import { useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CampusMap from '../components/map/CampusMap';
import RouteSummary from '../components/map/RouteSummary';
import LocationCard from '../components/location/LocationCard';
import DistanceDisplay from '../components/location/DistanceDisplay';
import FavoriteButton from '../components/destinations/FavoriteButton';
import LoadingView from '../components/common/LoadingView';
import ErrorView from '../components/common/ErrorView';
import NavigationButton from '../components/common/NavigationButton';
import { useUserLocation } from '../hooks/useUserLocation';
import { useDestinations } from '../hooks/useDestinations';
import { useFavorites } from '../hooks/useFavorites';
import { bearingDegrees, compassDirection } from '../utils/geo';
import { destinationToMapPoint, isInsideMap, latLngToMapPoint } from '../utils/mapProjection';
import { buildRoute, getGraphLines, hasArrived } from '../utils/routing';
import { getIssueContent } from '../utils/permissionMessages';
import { UserLocation } from '../types';
import { colors, radius, spacing } from '../constants/theme';


// FOR TESTING ONLY: set a fake spot on campus, then set back to null before presenting.
// Example: { latitude: 8.48652, longitude: 124.65573, accuracy: 5 }
//const DEBUG_FAKE_LOCATION: UserLocation | null = null;
const DEBUG_FAKE_LOCATION: UserLocation | null = { latitude: 8.48652, longitude: 124.65573, accuracy: 5 };
// FOR TRACING PATHS: set to true to draw your path network in red, then back to false.
const SHOW_PATH_GRAPH = true;

export default function MapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { state, reload } = useUserLocation();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [navigating, setNavigating] = useState(false);

  const location: UserLocation | null =
    DEBUG_FAKE_LOCATION ?? (state.status === 'ready' ? state.location : null);
  const { destinations, selected, selectDestination } = useDestinations(location, id ?? null);

  // When the list screen sends us back with a building id, select it and stop any active route.
  useEffect(() => {
    if (id) {
      setNavigating(false);
      selectDestination(id);
    }
  }, [id]);

  if (!DEBUG_FAKE_LOCATION && state.status === 'loading') {
    return <LoadingView message="Getting your location..." />;
  }

  if (!DEBUG_FAKE_LOCATION && state.status === 'error') {
    const content = getIssueContent(state.issue);
    return (
      <ErrorView
        title={content.title}
        message={content.message}
        actionLabel={content.actionLabel}
        onAction={content.action === 'settings' ? () => Linking.openSettings() : reload}
        secondaryLabel="Back to home"
        onSecondary={() => router.replace('/')}
      />
    );
  }

  // Business results, calculated before drawing.
  const userPoint = location ? latLngToMapPoint(location) : null;
  const insideCampus = userPoint ? isInsideMap(userPoint) : false;
  const selectedPoint = selected ? destinationToMapPoint(selected) : null;
  const direction =
    location && selected ? compassDirection(bearingDegrees(location, selected)) : undefined;

  const route =
    navigating && insideCampus && userPoint && selected ? buildRoute(userPoint, selected.id) : null;
  const noRouteFound = navigating && insideCampus && selected !== null && route === null;

  // Graceful fallback: if no walkway connects, show a straight line instead of nothing.
  const lineToDraw =
    route?.points ??
    (noRouteFound && userPoint && selectedPoint ? [userPoint, selectedPoint] : null);

  const markers = destinations.map((d) => ({
    id: d.id,
    number: d.number,
    point: destinationToMapPoint(d),
    selected: d.id === selected?.id,
  }));

  const handleSelect = (buildingId: string) => {
    setNavigating(false); // choosing another building ends the current route
    selectDestination(buildingId);
  };

  // Tapping empty map closes the building card, but never cancels an active route by accident.
  const handleMapPress = () => {
    if (!navigating) selectDestination(null);
  };

  const handleStart = () => {
    if (!insideCampus) {
      Alert.alert('You are outside the campus', 'Go to the campus to start walking navigation.');
      return;
    }
    setNavigating(true);
  };

  return (
    <View style={styles.container}>
      <CampusMap
        markers={markers}
        userPoint={insideCampus ? userPoint : null}
        route={lineToDraw}
        debugLines={SHOW_PATH_GRAPH ? getGraphLines() : undefined}
        onMarkerPress={handleSelect}
        onMapPress={handleMapPress}
      />

      <View style={[styles.topRow, { top: insets.top + spacing.sm }]}>
        <View style={styles.topCard}>
          {location ? (
            <LocationCard
              latitude={location.latitude}
              longitude={location.longitude}
              accuracy={location.accuracy}
              note={insideCampus ? undefined : 'You are outside the mapped campus area.'}
            />
          ) : null}
        </View>
        <NavigationButton label="List" onPress={() => router.push('/destinations')} />
      </View>

      <View style={[styles.bottomCard, { bottom: insets.bottom + spacing.md }]}>
        {selected && navigating ? (
          <RouteSummary
            destinationName={selected.name}
            meters={route?.meters ?? selected.distanceMeters}
            minutes={route?.minutes ?? null}
            arrived={hasArrived(selected.distanceMeters)}
            fallbackNote={noRouteFound ? 'No walkway found. Showing a straight line.' : undefined}
            onStop={() => setNavigating(false)}
          />
        ) : selected ? (
          <>
            <View style={styles.titleRow}>
              <Text style={styles.name}>
                Bldg. {selected.number}: {selected.name}
              </Text>
              <FavoriteButton
                isFavorite={isFavorite(selected.id)}
                onToggle={() => toggleFavorite(selected.id)}
              />
            </View>
            <Text style={styles.category}>{selected.category}</Text>
            <DistanceDisplay
              meters={selected.distanceMeters}
              destinationName={selected.name}
              direction={direction}
            />
            <NavigationButton label="Start navigation" onPress={handleStart} />
          </>
        ) : (
          <Text style={styles.hint}>Tap a numbered pin, or open the list, to choose a building.</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topRow: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  topCard: { flex: 1 },
  bottomCard: {
    position: 'absolute',
    left: spacing.md,
    right: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.96)',
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    elevation: 8,
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  name: { flex: 1, fontSize: 18, fontWeight: '700', color: colors.text },
  category: { color: colors.textMuted },
  hint: { textAlign: 'center', color: colors.textMuted },
});