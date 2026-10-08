// PRESENTATION LAYER: search box and All / Favorites chips. State lives in the parent screen.
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing } from '../../constants/theme';

type Props = {
  query: string;
  onQueryChange: (text: string) => void;
  favoritesOnly: boolean;
  onFavoritesOnlyChange: (value: boolean) => void;
};

export default function DestinationFilters({
  query,
  onQueryChange,
  favoritesOnly,
  onFavoritesOnlyChange,
}: Props) {
  return (
    <View style={styles.container}>
      <TextInput
        value={query}
        onChangeText={onQueryChange}
        placeholder="Search building, category or number"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
        autoCorrect={false}
      />
      <View style={styles.chips}>
        <Pressable
          onPress={() => onFavoritesOnlyChange(false)}
          style={[styles.chip, !favoritesOnly && styles.chipActive]}
        >
          <Text style={[styles.chipText, !favoritesOnly && styles.chipTextActive]}>All</Text>
        </Pressable>
        <Pressable
          onPress={() => onFavoritesOnlyChange(true)}
          style={[styles.chip, favoritesOnly && styles.chipActive]}
        >
          <Text style={[styles.chipText, favoritesOnly && styles.chipTextActive]}>Favorites</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    fontSize: 15,
    color: colors.text,
  },
  chips: { flexDirection: 'row', gap: spacing.sm },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: 14, color: colors.text, fontWeight: '600' },
  chipTextActive: { color: '#FFFFFF' },
});