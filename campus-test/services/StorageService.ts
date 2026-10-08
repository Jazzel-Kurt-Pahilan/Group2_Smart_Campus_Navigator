// DATA LAYER: saves small pieces of data on the phone with AsyncStorage (a simple key-value store).
// It only reads and writes. It does not decide what to save (that is the Business layer's job).
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'campus:favoriteDestinationIds';

// Returns the saved favorite building ids. If storage fails or the data is damaged, returns an empty list.
export async function loadFavoriteIds(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(FAVORITES_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

// Returns true if the list was saved, false if saving failed.
export async function saveFavoriteIds(ids: string[]): Promise<boolean> {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
    return true;
  } catch {
    return false;
  }
}