// PRESENTATION LAYER: one building in the list. Nothing is hard-coded: the parent passes everything in.
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FavoriteButton from '../../components/destinations/FavoriteButton';
import { colors, radius, spacing } from '../../constants/theme';

type Props = {
  number: number;
  name: string;
  category: string;
  distance: string; // already formatted text, for example "350 meters"
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
};

export default function DestinationCard({
  number,
  name,
  category,
  distance,
  isFavorite,
  onPress,
  onToggleFavorite,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{number}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.meta}>
          {category} · {distance}
        </Text>
      </View>

      <FavoriteButton isFavorite={isFavorite} onToggle={onToggleFavorite} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  pressed: { opacity: 0.85 },
  badge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14 },
  info: { flex: 1, gap: 2 },
  name: { fontSize: 16, fontWeight: '600', color: colors.text },
  meta: { fontSize: 13, color: colors.textMuted },
});