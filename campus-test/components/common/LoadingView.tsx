// PRESENTATION LAYER: shown while waiting (for example, for GPS). Message comes from props.
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '../../constants/theme';

type Props = {
  message: string;
};

export default function LoadingView({ message }: Props) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.gold} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ink,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  message: { color: '#FFFFFF', fontSize: 16, textAlign: 'center' },
});