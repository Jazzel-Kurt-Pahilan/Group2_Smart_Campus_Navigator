// PRESENTATION LAYER: one numbered pin on the map.
// It cancels the map's zoom and rotation, so it stays the same size and the number stays upright.
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { colors } from '../../constants/campusTheme';

const SIZE = 26;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  number: number;
  x: number; // pixel position on the displayed map
  y: number;
  isSelected: boolean;
  onPress: () => void;
  mapScale: SharedValue<number>;
  mapRotation: SharedValue<number>;
};

export default function MapPin({ number, x, y, isSelected, onPress, mapScale, mapRotation }: Props) {
  const counterStyle = useAnimatedStyle(() => ({
    transform: [
      { rotateZ: `${-mapRotation.value}rad` },
      { scale: (isSelected ? 1.3 : 1) / mapScale.value },
    ],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      hitSlop={8}
      style={[
        styles.pin,
        { left: x - SIZE / 2, top: y - SIZE / 2, zIndex: isSelected ? 10 : 1 },
        isSelected && styles.selected,
        counterStyle,
      ]}
    >
      <Text style={[styles.number, isSelected && styles.numberSelected]}>{number}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  pin: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  selected: { backgroundColor: colors.gold, borderColor: colors.primaryDark },
  number: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  numberSelected: { color: colors.ink },
});