// BUSINESS LAYER: rules that check data before it is used.
import { Coordinates } from '../types';

export function isValidCoordinates(c: Coordinates | null): c is Coordinates {
  return (
    c !== null &&
    Number.isFinite(c.latitude) &&
    Number.isFinite(c.longitude) &&
    Math.abs(c.latitude) <= 90 &&
    Math.abs(c.longitude) <= 180
  );
}