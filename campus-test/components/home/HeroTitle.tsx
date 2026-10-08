// PRESENTATION LAYER: welcome text block. All text comes from props.
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors } from '../../constants/theme';

type Props = {
  eyebrow: string;
  title: string;
  lines: string[];
  tagline: string;
};

export default function HeroTitle({ eyebrow, title, lines, tagline }: Props) {
  const { width } = useWindowDimensions();
  const compact = width < 380;

  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <View style={styles.badgeLine} />
        <Text style={[styles.eyebrow, compact && styles.eyebrowCompact]}>{eyebrow}</Text>
      </View>

      <View style={styles.titleGroup}>
        <Text style={[styles.title, compact && styles.titleCompact]}>{title}</Text>
        {lines.map((line) => (
          <Text key={line} style={[styles.subTitle, compact && styles.subTitleCompact]}>
            {line}
          </Text>
        ))}
      </View>

      <Text style={styles.tagline}>{tagline}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', width: '100%' },
  badge: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  badgeLine: { width: 3, height: 12, backgroundColor: colors.gold, marginRight: 8, borderRadius: 2 },
  eyebrow: {
    color: 'rgba(255,255,255,0.95)',
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    fontSize: 13,
    letterSpacing: 3,
    textTransform: 'uppercase',
  },
  eyebrowCompact: { fontSize: 11 },
  titleGroup: { marginBottom: 16, alignItems: 'center', width: '100%' },
  title: {
    fontFamily: 'Cinzel_900Black',
    color: colors.gold,
    fontSize: 52,
    lineHeight: 52,
    letterSpacing: -1,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 10,
  },
  titleCompact: { fontSize: 44, lineHeight: 46 },
  subTitle: {
    fontFamily: 'Cinzel_900Black',
    color: colors.gold,
    fontSize: 26,
    lineHeight: 30,
    letterSpacing: -0.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.9)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 8,
  },
  subTitleCompact: { fontSize: 22, lineHeight: 26 },
  tagline: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: 'rgba(241,245,249,0.92)',
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: 28,
    textShadowColor: 'rgba(0,0,0,0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});