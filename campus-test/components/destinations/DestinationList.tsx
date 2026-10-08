// PRESENTATION LAYER: scrolling list of DestinationCard. It only displays what it receives.
import { FlatList, StyleSheet, Text, View } from 'react-native';
import DestinationCard from '../../components/destinations/DestinationCard';
import { colors, spacing } from '../../constants/theme';
import { formatDistance } from '../../utils/formatters';
import { DestinationWithDistance } from '../../types';

type Props = {
  destinations: DestinationWithDistance[];
  favoriteIds: string[];
  emptyMessage: string;
  onSelect: (id: string) => void;
  onToggleFavorite: (id: string) => void;
};

export default function DestinationList({
  destinations,
  favoriteIds,
  emptyMessage,
  onSelect,
  onToggleFavorite,
}: Props) {
  return (
    <FlatList
      data={destinations}
      keyExtractor={(d) => d.id}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListEmptyComponent={<Text style={styles.empty}>{emptyMessage}</Text>}
      renderItem={({ item }) => (
        <DestinationCard
          number={item.number}
          name={item.name}
          category={item.category}
          distance={item.distanceMeters === null ? 'distance unavailable' : formatDistance(item.distanceMeters)}
          isFavorite={favoriteIds.includes(item.id)}
          onPress={() => onSelect(item.id)}
          onToggleFavorite={() => onToggleFavorite(item.id)}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: { paddingBottom: spacing.xl },
  separator: { height: spacing.sm },
  empty: { textAlign: 'center', color: colors.textMuted, marginTop: spacing.xl },
});