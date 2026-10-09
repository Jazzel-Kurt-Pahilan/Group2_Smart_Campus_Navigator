import { Platform, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS, IS_SMALL_DEVICE } from '../../constants/theme';

export default function BrandTitle() {
  return (
    <View style={styles.group}>
      <Text style={styles.ustp}>USTP</Text>
      <Text style={styles.sub}>SMART CAMPUS</Text>
      <Text style={styles.sub}>NAVIGATOR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  group: { marginBottom: 16, alignItems: 'center', width: '100%' },

  ustp: {
    fontFamily: FONTS.title,
    color: COLORS.gold,
    fontSize: Platform.OS === 'web' ? 104 : IS_SMALL_DEVICE ? 44 : 52,
    lineHeight: Platform.OS === 'web' ? 96 : IS_SMALL_DEVICE ? 46 : 52,
    textTransform: 'uppercase',
    letterSpacing: -1,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },

  sub: {
    fontFamily: FONTS.title,
    color: COLORS.gold,
    fontSize: Platform.OS === 'web' ? 46 : IS_SMALL_DEVICE ? 22 : 26,
    lineHeight: Platform.OS === 'web' ? 48 : IS_SMALL_DEVICE ? 26 : 30,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
  },
});