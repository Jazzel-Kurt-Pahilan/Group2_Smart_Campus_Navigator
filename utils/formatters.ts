// BUSINESS LAYER: turns numbers into text for display.
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} meters`;
  return `${(meters / 1000).toFixed(1)} km`;
}

export function formatCoordinate(value: number): string {
  return value.toFixed(5);
}