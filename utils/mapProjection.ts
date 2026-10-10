// BUSINESS LAYER: converts positions into places on the map image.
// Pins and paths use the pixel numbers measured on the image (mapX / mapY).
// Only the user's GPS position needs the GPS-to-pixel conversion.
import { MAP_AFFINE, MAP_IMAGE } from '../data/mapConfig';
import { Coordinates, Destination, MapPoint } from '../types';

// GPS to map position, using the best-fit conversion in mapConfig.ts.
export function latLngToMapPoint(c: Coordinates): MapPoint {
  const px = MAP_AFFINE.x[0] * c.longitude + MAP_AFFINE.x[1] * c.latitude + MAP_AFFINE.x[2];
  const py = MAP_AFFINE.y[0] * c.longitude + MAP_AFFINE.y[1] * c.latitude + MAP_AFFINE.y[2];
  return { x: px / MAP_IMAGE.width, y: py / MAP_IMAGE.height };
}

// A building's pin position, taken straight from its pixel numbers.
export function destinationToMapPoint(d: Destination): MapPoint {
  return { x: d.mapX / MAP_IMAGE.width, y: d.mapY / MAP_IMAGE.height };
}

// Is this point on the image? (False means the user is outside the mapped campus.)
export function isInsideMap(p: MapPoint): boolean {
  return p.x >= 0 && p.x <= 1 && p.y >= 0 && p.y <= 1;
}