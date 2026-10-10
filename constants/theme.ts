import { Dimensions } from 'react-native';

export const COLORS = {
  gold: '#F5B014',
  navy: '#020617',
  slate: '#0f172a',
};

export const FONTS = {
  title: 'Cinzel_900Black',
  semibold: 'PlusJakartaSans_600SemiBold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
};

export const IS_SMALL_DEVICE = Dimensions.get('window').width < 380;
