// PRESENTATION LAYER: reusable error screen. It shows what it is given and calls
// the functions the parent passes; it does not know about permissions at all.
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MapPin } from 'lucide-react-native';
import { colors, radius, spacing } from '../../constants/campusTheme';

type Props = {
  title: string;
  message: string;
  actionLabel: string;
  onAction: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
};

export default function ErrorView({
  title,
  message,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondary,
}: Props) {
  return (
    <View style={styles.container}>
      <MapPin color={colors.gold} size={48} strokeWidth={2} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>

      <TouchableOpacity style={styles.primary} onPress={onAction} activeOpacity={0.85}>
        <Text style={styles.primaryText}>{actionLabel}</Text>
      </TouchableOpacity>

      {secondaryLabel && onSecondary ? (
        <TouchableOpacity onPress={onSecondary} activeOpacity={0.7}>
          <Text style={styles.secondaryText}>{secondaryLabel}</Text>
        </TouchableOpacity>
      ) : null}
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
    padding: spacing.xl,
  },
  title: { color: colors.gold, fontSize: 22, fontWeight: '700', textAlign: 'center' },
  message: { color: 'rgba(241,245,249,0.9)', fontSize: 15, lineHeight: 22, textAlign: 'center' },
  primary: {
    backgroundColor: colors.gold,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
    marginTop: spacing.sm,
  },
  primaryText: { color: colors.ink, fontSize: 15, fontWeight: '700' },
  secondaryText: { color: '#FFFFFF', fontSize: 14, textDecorationLine: 'underline' },
});