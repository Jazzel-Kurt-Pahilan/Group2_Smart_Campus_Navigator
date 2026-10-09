// PRESENTATION LAYER: shows the user's current coordinates. Everything comes from props.
import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../../constants/campusTheme';
import { formatCoordinate } from '../../utils/formatters';

type Props = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  note?: string;
};

export default function LocationCard({ latitude, longitude, accuracy, note }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Your location</Text>
      <Text style={styles.text}>
        {formatCoordinate(latitude)}, {formatCoordinate(longitude)}
      </Text>
      {accuracy !== null ? <Text style={styles.muted}>Accuracy: about {Math.round(accuracy)} m</Text> : null}
      {note ? <Text style={styles.note}>{note}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: radius.md,
    padding: spacing.sm + 4,
    gap: 2,
    elevation: 6,
  },
  title: { fontSize: 13, fontWeight: '700', color: colors.primaryDark },
  text: { fontSize: 14, color: colors.text },
  muted: { fontSize: 12, color: colors.textMuted },
  note: { fontSize: 12, color: colors.error, marginTop: 2 },
});