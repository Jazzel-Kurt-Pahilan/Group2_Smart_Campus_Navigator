import { Cinzel_900Black, useFonts } from '@expo-google-fonts/cinzel';
import {
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import BrandTitle from '@/components/home/BrandTitle';
import ExploreButton from '@/components/home/ExploreButton';
import PermissionNotice from '@/components/home/PermissionNotice';
import { COLORS, FONTS, IS_SMALL_DEVICE } from '@/constants/theme';
import { useMapAccess } from '@/hooks/useMapAcess';

export default function HomeScreen() {
  const router = useRouter();
  const { checking, error, requestAccess, openSettings } = useMapAccess();

  const [fontsLoaded] = useFonts({
    Cinzel_900Black,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.gold} />
      </View>
    );
  }

  const handleExplore = async () => {
    const granted = await requestAccess();
    if (granted) router.push('/MapScreen');
  };

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

            <ExploreButton onPress={handleExplore} loading={checking} />

            {error && (
              <PermissionNotice message={error} onOpenSettings={openSettings} />
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%', height: '100%', backgroundColor: COLORS.navy },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    maxWidth: 340,
    marginBottom: 28,
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});