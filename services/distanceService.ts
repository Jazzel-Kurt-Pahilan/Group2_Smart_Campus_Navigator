const EARTH_RADIUS_METERS = 6371000;

export function calculateDistance(
  userLatitude: number,
  userLongitude: number,
  destinationLatitude: number,
  destinationLongitude: number
): number {
  const latitude1 = (userLatitude * Math.PI) / 180;
  const latitude2 = (destinationLatitude * Math.PI) / 180;

  const deltaLatitude =
    ((destinationLatitude - userLatitude) * Math.PI) / 180;

  const deltaLongitude =
    ((destinationLongitude - userLongitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLatitude / 2) ** 2 +
    Math.cos(latitude1) *
      Math.cos(latitude2) *
      Math.sin(deltaLongitude / 2) ** 2;

  const c =
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_METERS * c;
}

export function getDistanceToBuilding(
  userLatitude: number,
  userLongitude: number,
  buildingLatitude: number | null,
  buildingLongitude: number | null
): number | null {
  if (
    buildingLatitude === null ||
    buildingLongitude === null
  ) {
    return null;
  }

  return calculateDistance(
    userLatitude,
    userLongitude,
    buildingLatitude,
    buildingLongitude
  );
}