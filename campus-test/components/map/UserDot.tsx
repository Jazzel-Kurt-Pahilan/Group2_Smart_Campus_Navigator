// PRESENTATION LAYER: the "you are here" marker: person icon, double pulse and a "You" label.
// It cancels the map's zoom and rotation, so it stays the same size and upright.
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { User } from 'lucide-react-native';

const BOX = 80;
const CORE = 34;
const BLUE = '#1D6FEB';

type Props = {
  x: number;
  y: number;
  mapScale: SharedValue<number>;
  mapRotation: SharedValue<number>;
};

export default function UserDot({ x, y, mapScale, mapRotation }: Props) {
  const pulseA = useSharedValue(0);
  const pulseB = useSharedValue(0);

  useEffect(() => {
    const loop = withRepeat(
      withTiming(1, { duration: 2200, easing: Easing.out(Easing.quad) }),
      -1,
      false
    );
    pulseA.value = loop;
    pulseB.value = withDelay(
      1100,
      withRepeat(withTiming(1, { duration: 2200, easing: Easing.out(Easing.quad) }), -1, false)
    );
  }, [pulseA, pulseB]);

  const wrapperStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${-mapRotation.value}rad` }, { scale: 1 / mapScale.value }],
  }));

  const ringA = useAnimatedStyle(() => ({
    opacity: 0.5 * (1 - pulseA.value),
    transform: [{ scale: 0.5 + pulseA.value * 1.1 }],
  }));
  const ringB = useAnimatedStyle(() => ({
    opacity: 0.5 * (1 - pulseB.value),
    transform: [{ scale: 0.5 + pulseB.value * 1.1 }],
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.box, { left: x - BOX / 2, top: y - BOX / 2 }, wrapperStyle]}
    >
      <Animated.View style={[styles.pulse, ringA]} />
      <Animated.View style={[styles.pulse, ringB]} />
      <View style={styles.core}>
        <User size={18} color="#FFFFFF" strokeWidth={2.5} />
      </View>
      <View style={styles.label}>
        <Text style={styles.labelText}>You</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: 'absolute',
    width: BOX,
    height: BOX,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  pulse: {
    position: 'absolute',
    width: BOX - 16,
    height: BOX - 16,
    borderRadius: (BOX - 16) / 2,
    backgroundColor: BLUE,
  },
  core: {
    width: CORE,
    height: CORE,
    borderRadius: CORE / 2,
    backgroundColor: BLUE,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
  label: {
    position: 'absolute',
    top: BOX / 2 + CORE / 2 + 2,
    backgroundColor: '#0B3A66',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 1,
  },
  labelText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
});