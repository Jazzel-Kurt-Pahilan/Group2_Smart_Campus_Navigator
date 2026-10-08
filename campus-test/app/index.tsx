// PRESENTATION LAYER: Home / Dashboard (parent screen).
// It holds the text and passes it down to child components through props.
import { Cinzel_900Black, useFonts } from '@expo-google-fonts/cinzel';
import {
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, ImageBackground, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeroTitle from '../components/home/HeroTitle';
import ExploreBar from '../components/home/ExploreBar';
import { colors } from '../constants/theme';
 import { useLocationPermission } from '../hooks/useLocationPermission';

export default function HomeScreen() {
  const router = useRouter();

  const { checking, requestAccess } = useLocationPermission();

  const [fontsLoaded] = useFonts({
    Cinzel_900Black,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.gold} />
      </View>
    );
  }

  const handleExplore = async () => {
    const issue = await requestAccess(); // shows the permission pop-up if needed
    if (issue === null) {
      router.push('/map');
    } else {
      router.push({ pathname: '/denied', params: { reason: issue } });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require('../assets/campus_img/welcomebg.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(2,6,23,0.70)', 'rgba(15,23,42,0.40)', 'rgba(2,6,23,0.80)']}
          style={StyleSheet.absoluteFill}
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.center}>
            <HeroTitle
              eyebrow="WELCOME TO"
              title="USTP"
              lines={['SMART CAMPUS', 'NAVIGATOR']}
              tagline="Find your space."
            />
            <ExploreBar
              label={checking ? 'CHECKING LOCATION...' : 'EXPLORE CAMPUS MAP'}
              buttonLabel="EXPLORE"
              onPress={handleExplore}
              loading={checking}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.ink },
  loading: { flex: 1, backgroundColor: colors.ink, alignItems: 'center', justifyContent: 'center' },
  background: { flex: 1 },
  safeArea: { flex: 1, paddingHorizontal: 20, paddingVertical: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
});