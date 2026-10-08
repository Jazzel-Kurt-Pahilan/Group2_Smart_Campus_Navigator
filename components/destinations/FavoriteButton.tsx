// PRESENTATION LAYER: star button. It shows the state it is given and tells the parent when tapped.
import { Pressable } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors } from '../../constants/campusTheme';

type Props = {
  isFavorite: boolean;
  onToggle: () => void;
};

export default function FavoriteButton({ isFavorite, onToggle }: Props) {
  return (
    <Pressable
      onPress={onToggle}
      hitSlop={10}
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star size={24} color={colors.gold} fill={isFavorite ? colors.gold : 'transparent'} strokeWidth={2} />
    </Pressable>
  );
}
