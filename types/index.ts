// Shared types used across layers.
export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Destination = {
  id: string;
  number: number;
  name: string;
  category: string;
  latitude: number;  // used for distance
  longitude: number;
  mapX: number;      // pin position in pixels on the final map image
  mapY: number;
   gpsEstimated?: boolean;
};

export type DestinationWithDistance = Destination & {
  distanceMeters: number | null; // null when the user's location is unknown
};

// A position on the map image as a fraction: x and y go from 0 to 1.
export type MapPoint = {
  x: number;
  y: number;
};

export type UserLocation = Coordinates & {
  accuracy: number | null;
};

// Why location could not be used. Drives which message the user sees.
export type LocationIssue = 'denied' | 'blocked' | 'servicesOff' | 'unavailable';

// A junction, turn or building entrance on a campus walkway (position as a 0-1 fraction of the image).
export type PathNode = {
  id: string;
  x: number;
  y: number;
  destinationId?: string; // set on the node at a building's entrance
};

export type PathEdge = [string, string]; // two node ids joined by a walkway

export type NavigationRoute = {
  points: MapPoint[]; // the line to draw, starting at the user
  meters: number;
  minutes: number;
};