// BUSINESS LAYER: combines destinations with the user's location and tracks the selection.
import { useMemo, useState } from 'react';
import { DESTINATIONS } from '../data/destinations';
import { Coordinates, DestinationWithDistance } from '../types';
import { distanceMeters } from '../utils/geo';

export function useDestinations(
  userLocation: Coordinates | null,
  initialSelectedId: string | null = null
) {
  const [selectedId, setSelectedId] = useState<string | null>(initialSelectedId);

  const destinations: DestinationWithDistance[] = useMemo(
    () =>
      DESTINATIONS.map((d) => ({
        ...d,
        distanceMeters:
          userLocation !== null
            ? distanceMeters(userLocation, d)
            : null,
      })),
    [userLocation]
  );

  const selected = destinations.find((d) => d.id === selectedId) ?? null;

  return {
    destinations,
    selected,
    selectDestination: setSelectedId,
  };
}