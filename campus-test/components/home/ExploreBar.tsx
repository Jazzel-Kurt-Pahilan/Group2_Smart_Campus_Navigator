// PRESENTATION LAYER: glass capsule with the Explore button.
// The parent decides the labels, the loading state and what happens on press.
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { MapPin, Navigation } from 'lucide-react-native';
import { colors } from '../../constants/theme';

type Props = {
  label: string;
  buttonLabel: string;
  onPress: () => void;
  loading?: boolean;
};

export default function ExploreBar({ label, buttonLabel, onPress, loading = false }: Props) {
  const { width } = useWindowDimensions();
  const compact = width < 380;

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      disabled={loading}
      style={styles.wrapper}
    >
      <View style={[styles.capsule, { paddingLeft: compact ? 12 : 16 }]}>
        <View style={styles.left}>
          <MapPin color={colors.slate} size={compact ? 16 : 18} strokeWidth={2.5} />
          <Text numberOfLines={1} style={[styles.label, compact && styles.labelCompact]}>
            {label}
          </Text>
        </View>

        <View style={[styles.button, { paddingHorizontal: compact ? 14 : 18 }]}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.ink} />
          ) : (
            <>
              <Text style={[styles.buttonText, compact && styles.buttonTextCompact]}>
                {buttonLabel}
              </Text>
              <Navigation color={colors.ink} size={13} strokeWidth={3} />
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: { width: '100%', maxWidth: 420, borderRadius: 9999, overflow: 'hidden' },
  capsule: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.32)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 9999,
    padding: 4,
    elevation: 8,
  },
  left: { flexDirection: 'row', alignItems: 'center', flex: 1, paddingRight: 8, gap: 8 },
  label: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: colors.slate,
    fontSize: 11.5,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    flexShrink: 1,
  },
  labelCompact: { fontSize: 10 },
  button: {
    backgroundColor: colors.gold,
    paddingVertical: 9,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  buttonText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: colors.ink,
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  buttonTextCompact: { fontSize: 10 },
});