import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Cinzel_900Black } from '@expo-google-fonts/cinzel';
import {
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_800ExtraBold,
} from '@expo-google-fonts/plus-jakarta-sans';
import { MapPin, Navigation } from 'lucide-react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallDevice = SCREEN_WIDTH < 380;

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Cinzel_900Black,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F5B014" />
      </View>
    );
  }

  const handleNavigateToMap = () => {
    console.log('Navigating to Campus Map...');
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      {/* Background Image */}
      <ImageBackground
        source={require('../../assets/welcomebg.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Dark Gradient Overlay */}
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

            {/* Welcome Badge */}
            <View style={styles.badgeContainer}>
              <View style={styles.badgeLine} />

              <Text style={styles.welcomeText}>
                WELCOME TO
              </Text>
            </View>

            {/* Brand Title */}
            <View style={styles.brandTitleGroup}>
              <Text style={styles.ustpTitle}>
                USTP
              </Text>

              <Text style={styles.subBrandTitle}>
                SMART CAMPUS
              </Text>

              <Text
                style={[
                  styles.subBrandTitle,
                  styles.subBrandTitleLast,
                ]}
              >
                NAVIGATOR
              </Text>
            </View>

            {/* Subtitle */}
            <Text style={styles.subtitleText}>
              Find your space.
            </Text>

            {/* Navigation Button */}
            <TouchableOpacity
              activeOpacity={0.88}
              onPress={handleNavigateToMap}
              style={styles.touchableWrapper}
            >
              <View style={styles.glassCapsule}>

                {/* Left Section */}
                <View style={styles.pillLeftSection}>
                  <MapPin
                    color="#0f172a"
                    size={isSmallDevice ? 16 : 18}
                    strokeWidth={2.5}
                  />

                  <Text
                    numberOfLines={1}
                    style={styles.pillLabelText}
                  >
                    EXPLORE CAMPUS MAP
                  </Text>
                </View>

                {/* Explore Button */}
                <View style={styles.yellowButton}>
                  <Text style={styles.yellowButtonText}>
                    EXPLORE
                  </Text>

                  <Navigation
                    color="#020617"
                    size={13}
                    strokeWidth={3}
                  />
                </View>

              </View>
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#020617',
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

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
    backgroundColor: '#F5B014',
    marginRight: 8,
    borderRadius: 2,
  },

  welcomeText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: isSmallDevice ? 11 : 13,
    fontWeight: '700',
    letterSpacing: 3,
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  brandTitleGroup: {
    marginBottom: 16,
    alignItems: 'center',
    width: '100%',
  },

  ustpTitle: {
    fontFamily: 'Cinzel_900Black',
    color: '#F5B014',
    fontSize:
      Platform.OS === 'web'
        ? 104
        : isSmallDevice
          ? 44
          : 52,
    lineHeight:
      Platform.OS === 'web'
        ? 96
        : isSmallDevice
          ? 46
          : 52,
    textTransform: 'uppercase',
    letterSpacing: -1,
    textAlign: 'center',

    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowRadius: 10,
  },

  subBrandTitle: {
    fontFamily: 'Cinzel_900Black',
    color: '#F5B014',
    fontSize:
      Platform.OS === 'web'
        ? 46
        : isSmallDevice
          ? 22
          : 26,
    lineHeight:
      Platform.OS === 'web'
        ? 48
        : isSmallDevice
          ? 26
          : 30,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    textAlign: 'center',

    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 8,
  },

  subBrandTitleLast: {
    marginTop: 0,
  },

  subtitleText: {
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: 'rgba(241, 245, 249, 0.92)',
    fontSize: Platform.OS === 'web' ? 14.5 : 13,
    lineHeight: Platform.OS === 'web' ? 22 : 19,
    textAlign: 'center',
    maxWidth: 340,
    marginBottom: 28,

    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 4,
  },

  touchableWrapper: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 9999,
    overflow: 'hidden',
  },

  glassCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(255, 255, 255, 0.32)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 9999,

    padding: 4,
    paddingLeft: isSmallDevice ? 12 : 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  pillLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 8,
    gap: 8,
  },

  pillLabelText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: '#0f172a',
    fontSize: isSmallDevice ? 10 : 11.5,
    letterSpacing: 0.8,
    fontWeight: '800',
    textTransform: 'uppercase',
    flexShrink: 1,
  },

  yellowButton: {
    backgroundColor: '#F5B014',
    paddingHorizontal: isSmallDevice ? 14 : 18,
    paddingVertical: 9,
    borderRadius: 9999,

    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  yellowButtonText: {
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: '#020617',
    fontSize: isSmallDevice ? 10 : 11,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});
