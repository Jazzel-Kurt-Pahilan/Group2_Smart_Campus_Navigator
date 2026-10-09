// BUSINESS LAYER: rules for ordering and searching destinations.
import { DestinationWithDistance } from '../types';

// Sort destinations by distance, nearest first.
export function sortByDistance(
  list: DestinationWithDistance[]
): DestinationWithDistance[] {
  return [...list].sort((a, b) => {
    if (a.distanceMeters === null && b.distanceMeters === null) {
      return a.number - b.number;
    }
    if (a.distanceMeters === null) return 1;
    if (b.distanceMeters === null) return -1;
    return a.distanceMeters - b.distanceMeters;
  });
}

// Filter destinations by name, category, or building number.
export function filterDestinations(
  list: DestinationWithDistance[],
  query: string
): DestinationWithDistance[] {
  const q = query.trim().toLowerCase();

  return list.filter((d) => {
    if (q === '') return true;

    return (
      d.name.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      String(d.number).startsWith(q)
    );
  });
}