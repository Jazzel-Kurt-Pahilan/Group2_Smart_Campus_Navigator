// app/(tabs)/MapScreen.tsx
import { useState } from 'react';
import { Image, Linking, Platform, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import MapPin from '../components/MapPin';
import NavigationButton from '../components/NavigationButton';
import { mapPins, Pin } from '../services/mapPins';

const MAX_SCALE = 5;

// Kept local for now so this file doesn't depend on another member's utils/Helpers file.
// If the group later adds a shared buildDirectionsUrl in utils/Helpers.ts, swap this out for an import.
function buildDirectionsUrl(latitude: number, longitude: number, label: string): string {
  const query = encodeURIComponent(label);
  const url = Platform.select({
    ios: `maps:0,0?q=${query}@${latitude},${longitude}`,
    android: `geo:0,0?q=${latitude},${longitude}(${query})`,
    default: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
  });
  return url as string;
}

// Real dimensions of campusmap.png — update these if the image is replaced again
const IMAGE_WIDTH = 1326;
const IMAGE_HEIGHT = 1170;
const IMAGE_ASPECT_RATIO = IMAGE_HEIGHT / IMAGE_WIDTH;

export default function MapScreen() {
  const { width, height } = useWindowDimensions();

  // Base the map's displayed size on the larger screen dimension (same intent as before),
  // but now width/height keep the image's real proportions instead of forcing a square.
  const mapWidth = Math.max(width, height);
  const mapHeight = mapWidth * IMAGE_ASPECT_RATIO;
  const minScale = Math.min(1, width / mapWidth); // lets the user zoom out to see the whole map

  const [selected, setSelected] = useState<Pin | null>(null);
  const hasCoords = selected !== null && selected.latitude !== null && selected.longitude !== null;

  // Zoom and drag values
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const savedTx = useSharedValue(0);
  const savedTy = useSharedValue(0);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      const maxX = Math.max(0, (mapWidth * scale.value - width) / 2);
      const maxY = Math.max(0, (mapHeight * scale.value - height) / 2);
      tx.value = Math.min(maxX, Math.max(-maxX, savedTx.value + e.translationX));
      ty.value = Math.min(maxY, Math.max(-maxY, savedTy.value + e.translationY));
    })
    .onEnd(() => {
      savedTx.value = tx.value;
      savedTy.value = ty.value;
    });

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.min(MAX_SCALE, Math.max(minScale, savedScale.value * e.scale));
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      const target = scale.value > 1.5 ? 1 : 2.5;
      scale.value = withTiming(target);
      savedScale.value = target;
      tx.value = withTiming(0);
      ty.value = withTiming(0);
      savedTx.value = 0;
      savedTy.value = 0;
    });

  // Rotation — two-finger twist to spin the map
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
 
  const rotate = Gesture.Rotation()
    .onUpdate((e) => {
      rotation.value = savedRotation.value + e.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const gesture = Gesture.Simultaneous(pan, pinch, rotate, doubleTap);

  const mapStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
    ],
  }));

  const handleStart = () => {
    if (!selected || selected.latitude === null || selected.longitude === null) return;
    const url = buildDirectionsUrl(selected.latitude, selected.longitude, selected.name);
    Linking.openURL(url);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <View style={styles.mapArea}>
          <Animated.View style={[{ width: mapWidth, height: mapHeight }, mapStyle]}>
            <Image
              source={require('../assets/campusmap.png')}
              style={{ width: mapWidth, height: mapHeight }}
              resizeMode="contain"
            />
            {mapPins.map((pin: Pin) => (
              <MapPin
                key={pin.id}
                number={pin.number}
                x={pin.x}
                y={pin.y}
                isSelected={selected?.id === pin.id}
                onPress={() => setSelected(pin)}
              />
            ))}
          </Animated.View>
        </View>
      </GestureDetector>

      {/* Floating card on top of the map, so the map keeps the whole screen */}
      <View style={styles.card}>
        {selected ? (
          <>
            <Text style={styles.name}>Bldg. {selected.number}: {selected.name}</Text>
            <Text style={styles.category}>{selected.category}</Text>
            <NavigationButton
              label={hasCoords ? 'Start Navigation' : 'Coordinates not set yet'}
              onPress={handleStart}
              disabled={!hasCoords}
            />
          </>
        ) : (
          <Text style={styles.hint}>Tap a numbered pin to select a building.</Text>
        )}
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#CFE8F7' },
  mapArea: { flex: 1, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  card: {
    position: 'absolute',
    left: 12,
    bottom: 24,
    width: 220,
    maxWidth: '60%',
    padding: 16,
    gap: 8,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
    elevation: 6,
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  category: { color: '#666' },
  hint: { textAlign: 'center', color: '#666' },
});