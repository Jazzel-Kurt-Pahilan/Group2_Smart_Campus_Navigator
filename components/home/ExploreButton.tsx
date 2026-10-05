import { MapPin, Navigation } from 'lucide-react-native';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, FONTS, IS_SMALL_DEVICE } from '../../constants/theme';

type Props = {
  onPress: () => void;
  loading?: boolean;
};

export default function ExploreButton({ onPress, loading = false }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      disabled={loading}
      style={styles.wrapper}
    >
      <View style={styles.capsule}>
        <View style={styles.left}>
          <MapPin
            color={COLORS.slate}
            size={IS_SMALL_DEVICE ? 16 : 18}
            strokeWidth={2.5}
          />
          <Text numberOfLines={1} style={styles.label}>
            EXPLORE CAMPUS MAP
          </Text>
        </View>

        <View style={styles.yellowButton}>
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.navy} />
          ) : (
            <>
              <Text style={styles.yellowText}>EXPLORE</Text>
              <Navigation color={COLORS.navy} size={13} strokeWidth={3} />
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 9999,
    overflow: 'hidden',
  },

  capsule: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 9999,
    padding: 4,
    paddingLeft: IS_SMALL_DEVICE ? 12 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
    gap: 8,
  },

  label: {
    fontFamily: FONTS.extrabold,
    color: COLORS.slate,
    fontSize: IS_SMALL_DEVICE ? 10 : 11.5,
    letterSpacing: 0.8,
    fontWeight: '800',
    textTransform: 'uppercase',
    flexShrink: 1,
  },

  yellowButton: {
    backgroundColor: COLORS.gold,
    paddingHorizontal: IS_SMALL_DEVICE ? 14 : 18,
    paddingVertical: 9,
    borderRadius: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    minWidth: 84,
    justifyContent: 'center',
  },

  yellowText: {
    fontFamily: FONTS.extrabold,
    color: COLORS.navy,
    fontSize: IS_SMALL_DEVICE ? 10 : 11,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});