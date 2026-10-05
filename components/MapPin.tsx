// components/MapPin.tsx
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  number: number;
  x: number;
  y: number;
  isSelected?: boolean;
  onPress: () => void;
};

export default function MapPin({ number, x, y, isSelected = false, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={[styles.touchArea, { left: `${x}%`, top: `${y}%` }]}
    >
      <View style={[styles.pin, isSelected && styles.pinActive]}>
        <Text style={[styles.pinText, isSelected && styles.pinTextActive]}>{number}</Text>
      </View>
      <View style={[styles.pointer, isSelected && styles.pointerActive]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchArea: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -16 }, { translateY: -36 }],
  },
  pin: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5B014',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#020617',
  },
  pinActive: {
    backgroundColor: '#22C55E',
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  pinText: {
    color: '#020617',
    fontWeight: '800',
    fontSize: 13,
  },
  pinTextActive: {
    color: '#fff',
    fontSize: 15,
  },
  pointer: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#F5B014',
    marginTop: -2,
  },
  pointerActive: {
    borderTopColor: '#22C55E',
  },
});