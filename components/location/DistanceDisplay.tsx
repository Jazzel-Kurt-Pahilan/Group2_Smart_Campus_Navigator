// PRESENTATION LAYER: shows distance to the selected destination.
// The distance text is made by the Business layer; this only displays it.
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/campusTheme';
import { formatDistance } from '../../utils/formatters';

type Props = {
  meters: number | null;
  destinationName: string;
  direction?: string;
};

export default function DistanceDisplay({ meters, destinationName, direction }: Props) {
  if (meters === null) {
    return <Text style={styles.muted}>Distance to {destinationName} is not available yet.</Text>;
  }
  return (
    <View>
      <Text style={styles.distance}>{formatDistance(meters)}</Text>
      <Text style={styles.muted}>
        to {destinationName}
        {direction ? `, to the ${direction}` : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  distance: { fontSize: 22, fontWeight: '700', color: colors.primaryDark },
  muted: { fontSize: 13, color: colors.textMuted },
});