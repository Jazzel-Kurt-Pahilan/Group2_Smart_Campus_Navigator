// PRESENTATION LAYER: campus map image you can drag, pinch-zoom and twist to rotate.
// It does no calculations: pins, the user dot and the route all arrive through props.
import { useRef } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Line, Polyline } from 'react-native-svg';
import MapPin from '../../components/map/MapPin';
import UserDot from '../../components/map/UserDot';
import { MAP_IMAGE } from '../../data/mapConfig';
import { MapPoint } from '../../types';

const MAX_SCALE = 5;

export type MapMarker = {
  id: string;
  number: number;
  point: MapPoint;
  selected: boolean;
};

type Props = {
  markers: MapMarker[];
  userPoint: MapPoint | null;
  route: MapPoint[] | null;
  debugLines?: { from: MapPoint; to: MapPoint }[];
  onMarkerPress: (id: string) => void;
  onMapPress: () => void; // tapping empty map (not a pin)
};

function clamp(value: number, min: number, max: number) {
  'worklet';
  return Math.min(max, Math.max(min, value));
}

export default function CampusMap({
  markers,
  userPoint,
  route,
  debugLines,
  onMarkerPress,
  onMapPress,
}: Props) {
  const { width, height } = useWindowDimensions();

  const mapWidth = Math.max(width, height);
  const mapHeight = (mapWidth * MAP_IMAGE.height) / MAP_IMAGE.width;
  const minScale = Math.min(1, width / mapWidth);

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0); // radians, clockwise
  const savedRotation = useSharedValue(0);
  const tx = useSharedValue(0);
  const ty = useSharedValue(0);
  const savedTx = useSharedValue(0);
  const savedTy = useSharedValue(0);

  // Remembers when a pin was last pressed, so that press is not also treated as a tap on empty map.
  const lastPinPress = useRef(0);

  // Keeps the map from being dragged completely off screen. It accounts for rotation by
  // using the size of the box that surrounds the rotated map.
  const keepInside = () => {
    'worklet';
    const cos = Math.abs(Math.cos(rotation.value));
    const sin = Math.abs(Math.sin(rotation.value));
    const maxX = Math.max(0, ((mapWidth * cos + mapHeight * sin) * scale.value - width) / 2);
    const maxY = Math.max(0, ((mapWidth * sin + mapHeight * cos) * scale.value - height) / 2);
    tx.value = clamp(tx.value, -maxX, maxX);
    ty.value = clamp(ty.value, -maxY, maxY);
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      tx.value = savedTx.value + e.translationX;
      ty.value = savedTy.value + e.translationY;
      keepInside();
    })
    .onEnd(() => {
      savedTx.value = tx.value;
      savedTy.value = ty.value;
    });

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = clamp(savedScale.value * e.scale, minScale, MAX_SCALE);
      keepInside();
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      savedTx.value = tx.value;
      savedTy.value = ty.value;
    });

  // Two-finger twist turns the map.
  const rotate = Gesture.Rotation()
    .onUpdate((e) => {
      rotation.value = savedRotation.value + e.rotation;
      keepInside();
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
      savedTx.value = tx.value;
      savedTy.value = ty.value;
    });

  // Double tap: zoom in, or reset the whole view (zoom, position and rotation).
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(250)
    .onEnd(() => {
      const zoomIn = scale.value <= 1.5;
      const target = zoomIn ? 2.5 : 1;
      scale.value = withTiming(target);
      savedScale.value = target;
      tx.value = withTiming(0);
      ty.value = withTiming(0);
      savedTx.value = 0;
      savedTy.value = 0;
      if (!zoomIn) {
        rotation.value = withTiming(0);
        savedRotation.value = 0;
      }
    });

  // Single tap on empty map. Runs on the JS thread because it calls React code.
  const singleTap = Gesture.Tap()
    .runOnJS(true)
    .onEnd((_event, success) => {
      if (success && Date.now() - lastPinPress.current > 600) onMapPress();
    });

  const gesture = Gesture.Simultaneous(
    pan,
    pinch,
    rotate,
    Gesture.Exclusive(doubleTap, singleTap)
  );

  const mapStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: tx.value },
      { translateY: ty.value },
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
    ],
  }));


  const handlePinPress = (id: string) => {
    lastPinPress.current = Date.now();
    onMarkerPress(id);
  };

  // Fractions (0 to 1) become pixels on the displayed map.
  const px = (p: MapPoint) => p.x * mapWidth;
  const py = (p: MapPoint) => p.y * mapHeight;

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gesture}>
        <View style={styles.mapArea}>
          <Animated.View style={[{ width: mapWidth, height: mapHeight }, mapStyle]}>
            <Image
              source={MAP_IMAGE.source}
              style={{ width: mapWidth, height: mapHeight }}
              resizeMode="stretch"
            />

            {(route && route.length > 1) || debugLines ? (
              <Svg width={mapWidth} height={mapHeight} style={StyleSheet.absoluteFill} pointerEvents="none">
                {debugLines?.map((line, i) => (
                  <Line
                    key={i}
                    x1={px(line.from)}
                    y1={py(line.from)}
                    x2={px(line.to)}
                    y2={py(line.to)}
                    stroke="red"
                    strokeWidth={2}
                  />
                ))}
                {route && route.length > 1 ? (
                  <>
                    <Polyline
                      points={route.map((p) => `${px(p)},${py(p)}`).join(' ')}
                      fill="none"
                      stroke="#FFFFFF"
                      strokeWidth={9}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <Polyline
                      points={route.map((p) => `${px(p)},${py(p)}`).join(' ')}
                      fill="none"
                      stroke="#1D6FEB"
                      strokeWidth={5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                ) : null}
              </Svg>
            ) : null}

            {markers.map((m) => (
              <MapPin
                key={m.id}
                number={m.number}
                x={px(m.point)}
                y={py(m.point)}
                isSelected={m.selected}
                onPress={() => handlePinPress(m.id)}
                mapScale={scale}
                mapRotation={rotation}
              />
            ))}

            {userPoint ? (
              <UserDot x={px(userPoint)} y={py(userPoint)} mapScale={scale} mapRotation={rotation} />
            ) : null}
          </Animated.View>
        </View>
      </GestureDetector>

    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#CFE8F7' },
  mapArea: { flex: 1, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
});