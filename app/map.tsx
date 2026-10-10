
import { useLocalSearchParams, useRouter } from 'expo-router';
import { House } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ErrorView from '../components/common/ErrorView';
import LoadingView from '../components/common/LoadingView';
import NavigationButton from '../components/common/NavigationButton';
import DistanceDisplay from '../components/location/DistanceDisplay';
import LocationCard from '../components/location/LocationCard';
import CampusMap from '../components/map/CampusMap';
import RouteSummary from '../components/map/RouteSummary';
import { colors, radius, spacing } from '../constants/campusTheme';
import { useDestinations } from '../hooks/useDestinations';
import { useUserLocation } from '../hooks/useUserLocation';
import { UserLocation } from '../types';
import { bearingDegrees, compassDirection } from '../utils/geo';
import { destinationToMapPoint, isInsideMap, latLngToMapPoint } from '../utils/mapProjection';
import { getIssueContent } from '../utils/permissionMessages';
import { buildRoute, getGraphLines, hasArrived } from '../utils/routing';

// TESTING: Keep fake GPS and walkway graph enabled.
const DEBUG_FAKE_LOCATION: UserLocation | null = null;
const SHOW_PATH_GRAPH = false;

export default function MapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { state, reload } = useUserLocation();
  const [navigating, setNavigating] = useState(false);

  const location: UserLocation | null =
    DEBUG_FAKE_LOCATION ?? (state.status === 'ready' ? state.location : null);

  const { destinations, selected, selectDestination } = useDestinations(location, id ?? null);

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

  const userPoint = location ? latLngToMapPoint(location) : null;
  const insideCampus = userPoint ? isInsideMap(userPoint) : false;
  const selectedPoint = selected ? destinationToMapPoint(selected) : null;
  const direction = location && selected
    ? compassDirection(bearingDegrees(location, selected))
    : undefined;

  const route = navigating && insideCampus && userPoint && selected
    ? buildRoute(userPoint, selected.id)
    : null;

  const noRouteFound = navigating && insideCampus && selected !== null && route === null;
  const lineToDraw = route?.points ??
    (noRouteFound && userPoint && selectedPoint ? [userPoint, selectedPoint] : null);

  const markers = destinations.map((d) => ({
    id: d.id,
    number: d.number,
    point: destinationToMapPoint(d),
    selected: d.id === selected?.id,
  }));

  const handleSelect = (buildingId: string) => {
    setNavigating(false);
    selectDestination(buildingId);
  };

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

      {/* LEFT: Home and List | RIGHT: Current Location */}
      <View style={[styles.topRow, { top: insets.top + spacing.sm }]}>
        <View style={styles.leftControls}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.replace('/')}
            accessibilityRole="button"
            accessibilityLabel="Back to Home"
          >
            <House size={22} color={colors.text} strokeWidth={2} />
            <Text style={styles.backText}>Home</Text>
          </Pressable>

          <NavigationButton label="List" onPress={() => router.push('/destinations')} />
        </View>

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
      </View>

      {/* Destination information */}
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
              <Text style={styles.name}>Bldg. {selected.number}: {selected.name}</Text>
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

  leftControls: { width: 80, alignItems: 'stretch', gap: spacing.sm },
  topCard: { flex: 1, minWidth: 0 },

  backButton: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.96)',
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: radius.lg,
    elevation: 4,
  },

  backText: { fontSize: 12, fontWeight: '600', color: colors.text },

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