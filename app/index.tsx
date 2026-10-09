import { Cinzel_900Black, useFonts } from '@expo-google-fonts/cinzel';
import {
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { useRouter } from 'expo-router';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import HomeView from '@/components/home/HomeView';
import { COLORS } from '@/constants/theme';
import { useMapAccess } from '@/hooks/useMapAccess';

export default function HomeScreen() {
  const router = useRouter();
  const { checking, error, requestAccess, openSettings } = useMapAccess();

  const [fontsLoaded] = useFonts({
    Cinzel_900Black,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_800ExtraBold,
  });

  const handleExplore = async () => {
    const granted = await requestAccess();

    if (granted) {
      router.push('/MapScreen');
    }
  };

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.gold} />
      </View>
    );
  }

  return (
    <HomeView
      checking={checking}
      error={error}
      onExplore={handleExplore}
      onOpenSettings={openSettings}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
});




