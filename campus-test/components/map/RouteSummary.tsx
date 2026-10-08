// PRESENTATION LAYER: shows the active walking route and lets the user stop it.
// Distances and times are calculated in the Business layer and arrive as props.
import { StyleSheet, Text, View } from 'react-native';
import NavigationButton from '../../components/common/NavigationButton';
import { colors } from '../../constants/theme';
import { formatDistance } from '../../utils/formatters';

type Props = {
  destinationName: string;
  meters: number | null;
  minutes: number | null;
  arrived: boolean;
  fallbackNote?: string;
  onStop: () => void;
};

export default function RouteSummary({
  destinationName,
  meters,
  minutes,
  arrived,
  fallbackNote,
  onStop,
}: Props) {
  if (arrived) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>You have arrived</Text>
        <Text style={styles.muted}>{destinationName}</Text>
        <NavigationButton label="Done" onPress={onStop} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Walking to {destinationName}</Text>
      {meters !== null && minutes !== null ? (
        <Text style={styles.stats}>
          {formatDistance(meters)} · about {minutes} min
        </Text>
      ) : null}
      {fallbackNote ? <Text style={styles.note}>{fallbackNote}</Text> : null}
      <NavigationButton label="Stop navigation" onPress={onStop} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  title: { fontSize: 18, fontWeight: '700', color: colors.text },
  stats: { fontSize: 16, color: colors.primaryDark, fontWeight: '600' },
  muted: { fontSize: 14, color: colors.textMuted },
  note: { fontSize: 12, color: colors.error },
});