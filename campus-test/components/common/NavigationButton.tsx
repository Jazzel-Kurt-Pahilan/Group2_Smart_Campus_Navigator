// PRESENTATION LAYER: reusable button. It knows nothing about screens or
// location; the parent decides the label and what happens on press (props).
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '../../constants/theme';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function NavigationButton({ label, onPress, disabled = false }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  pressed: { backgroundColor: colors.primaryDark },
  disabled: { opacity: 0.5 },
  label: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});