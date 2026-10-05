import { LinearGradient } from 'expo-linear-gradient';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { COLORS, FONTS, IS_SMALL_DEVICE } from '@/constants/theme';
import BrandTitle from './home/BrandTitle';
import ExploreButton from './home/ExploreButton';
import PermissionNotice from './home/PermissionNotice';

type Props = {
  checking: boolean;
  error: string | null;
  onExplore: () => void;
  onOpenSettings: () => void;
};

export default function HomeView({
  checking,
  error,
  onExplore,
  onOpenSettings,
}: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={require('../assets/welcomebg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={[
            'rgba(2, 6, 23, 0.70)',
            'rgba(15, 23, 42, 0.40)',
            'rgba(2, 6, 23, 0.80)',
          ]}
          style={StyleSheet.absoluteFill}
        />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContentLayout}>
            <View style={styles.badgeContainer}>
              <View style={styles.badgeLine} />
              <Text style={styles.welcomeText}>WELCOME TO</Text>
            </View>

            <BrandTitle />

            <Text style={styles.subtitleText}>Find your space.</Text>

            <ExploreButton onPress={onExplore} loading={checking} />

            {error && (
              <PermissionNotice message={error} onOpenSettings={onOpenSettings} />
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%', backgroundColor: COLORS.navy },
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContentLayout: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 600,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeLine: {
    width: 3,
    height: 12,
    backgroundColor: COLORS.gold,
    marginRight: 8,
    borderRadius: 2,
  },
  welcomeText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: IS_SMALL_DEVICE ? 11 : 13,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  subtitleText: {
    fontFamily: FONTS.semibold,
    color: 'rgba(241, 245, 249, 0.92)',
    fontSize: Platform.OS === 'web' ? 14.5 : 13,
    lineHeight: Platform.OS === 'web' ? 22 : 19,
    textAlign: 'center',
    maxWidth: 340,
    marginBottom: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});