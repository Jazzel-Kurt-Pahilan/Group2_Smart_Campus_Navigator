// BUSINESS LAYER: the favorites workflow (load, toggle, save) and the state the screens read.
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { loadFavoriteIds, saveFavoriteIds } from '../services/StorageService';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Reload whenever the screen comes into view, so the map and the list always agree.
  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadFavoriteIds().then((ids) => {
        if (active) setFavoriteIds(ids);
      });
      return () => {
        active = false;
      };
    }, [])
  );

  const isFavorite = (id: string) => favoriteIds.includes(id);

  const toggleFavorite = async (id: string) => {
    const previous = favoriteIds;
    const next = previous.includes(id) ? previous.filter((x) => x !== id) : [...previous, id];
    setFavoriteIds(next); // update the screen right away
    const saved = await saveFavoriteIds(next);
    if (!saved) setFavoriteIds(previous); // graceful fallback: undo if the phone could not save
  };

  return { favoriteIds, isFavorite, toggleFavorite };
}