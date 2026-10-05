// components/NavigationButton.tsx
import { Navigation } from 'lucide-react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function NavigationButton({ label = 'Start Navigation', onPress, disabled = false }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled]}
    >
      <Text style={[styles.text, disabled && styles.textDisabled]}>{label}</Text>
      {!disabled && <Navigation stroke="#020617" size={16} strokeWidth={3} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#F5B014',
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: '#444',
  },
  text: {
    color: '#020617',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  textDisabled: {
    color: '#999',
  },
});