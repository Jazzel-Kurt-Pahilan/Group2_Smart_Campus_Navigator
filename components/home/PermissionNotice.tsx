import { AlertCircle } from 'lucide-react-native';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTS } from '../../constants/theme';

type Props = {
  message: string;
  onOpenSettings: () => void;
};

export default function PermissionNotice({ message, onOpenSettings }: Props) {
  return (
    <View style={styles.card}>
      <AlertCircle color={COLORS.gold} size={18} strokeWidth={2.5} />
      <View style={styles.textWrap}>
        <Text style={styles.text}>{message}</Text>

        {Platform.OS !== 'web' && (
          <TouchableOpacity onPress={onOpenSettings}>
            <Text style={styles.link}>OPEN SETTINGS</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    width: '100%',
    maxWidth: 420,
    marginTop: 16,
    padding: 14,
    backgroundColor: 'rgba(2, 6, 23, 0.65)',
    borderWidth: 1,
    borderColor: 'rgba(245, 176, 20, 0.5)',
    borderRadius: 20,
  },
  textWrap: { flex: 1 },
  text: {
    fontFamily: FONTS.semibold,
    color: 'rgba(241, 245, 249, 0.92)',
    fontSize: 12.5,
    lineHeight: 18,
  },
  link: {
    fontFamily: FONTS.extrabold,
    color: COLORS.gold,
    fontSize: 11,
    letterSpacing: 0.8,
    marginTop: 8,
  },
});