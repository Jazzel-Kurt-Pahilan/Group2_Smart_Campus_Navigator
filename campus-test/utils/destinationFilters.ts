// BUSINESS LAYER: rules for ordering and searching the destination list. Pure functions, no UI.
import { DestinationWithDistance } from '../types';

// Nearest first. Buildings with no distance yet go last, in building-number order.
export function sortByDistance(list: DestinationWithDistance[]): DestinationWithDistance[] {
  return [...list].sort((a, b) => {
    if (a.distanceMeters === null && b.distanceMeters === null) return a.number - b.number;
    if (a.distanceMeters === null) return 1;
    if (b.distanceMeters === null) return -1;
    return a.distanceMeters - b.distanceMeters;
  });
}

// Keeps buildings that match the search text (name, category or number) and the favorites filter.
export function filterDestinations(
  list: DestinationWithDistance[],
  query: string,
  favoritesOnly: boolean,
  favoriteIds: string[]
): DestinationWithDistance[] {
  const q = query.trim().toLowerCase();
  return list.filter((d) => {
    if (favoritesOnly && !favoriteIds.includes(d.id)) return false;
    if (q === '') return true;
    return (
      d.name.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      String(d.number).startsWith(q)
    );
  });
}