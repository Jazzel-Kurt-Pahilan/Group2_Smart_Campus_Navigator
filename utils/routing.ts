// BUSINESS LAYER: builds a walking route from the user's map position to a destination.
// It uses the walkway network (Data layer) and Dijkstra's algorithm (pathfinding.ts).
import { MAP_IMAGE, METERS_PER_PIXEL } from '../data/mapConfig';
import { PATH_EDGES, PATH_NODES } from '../data/campusPaths';
import { Adjacency, dijkstra } from '../utils/pathfinding';
import { MapPoint, NavigationRoute } from '../types';

const WALKING_METERS_PER_MINUTE = 80; // about 4.8 km/h
export const ARRIVAL_RADIUS_METERS = 20;

// Straight-line distance between two map points, measured in image pixels.
const pixelDistance = (a: MapPoint, b: MapPoint) =>
  Math.hypot((a.x - b.x) * MAP_IMAGE.width, (a.y - b.y) * MAP_IMAGE.height);

const NODES_BY_ID = new Map(PATH_NODES.map((node) => [node.id, node]));

// Turns the list of walkway connections into a lookup: node -> neighbors and their cost.
function buildAdjacency(): Adjacency {
  const adjacency: Adjacency = new Map();
  PATH_NODES.forEach((node) => adjacency.set(node.id, []));
  PATH_EDGES.forEach(([idA, idB]) => {
    const a = NODES_BY_ID.get(idA);
    const b = NODES_BY_ID.get(idB);
    if (!a || !b) return; // ignore edges that point to a missing node
    const cost = pixelDistance(a, b);
    adjacency.get(idA)!.push({ to: idB, cost });
    adjacency.get(idB)!.push({ to: idA, cost });
  });
  return adjacency;
}

const ADJACENCY = buildAdjacency();

// The walkway node closest to a point (used to "snap" the user onto the paths).
function nearestNode(point: MapPoint) {
  return PATH_NODES.reduce((best, node) =>
    pixelDistance(point, node) < pixelDistance(point, best) ? node : best
  );
}

// Returns the route, or null if the destination has no entrance node or no connecting path.
export function buildRoute(userPoint: MapPoint, destinationId: string): NavigationRoute | null {
  if (PATH_NODES.length === 0) return null;

  const target = PATH_NODES.find((node) => node.destinationId === destinationId);
  if (!target) return null;

  const start = nearestNode(userPoint);
  const nodeIds = dijkstra(ADJACENCY, start.id, target.id);
  if (!nodeIds) return null;

  // The line starts at the user, then follows the walkway nodes to the building entrance.
  const points: MapPoint[] = [userPoint, ...nodeIds.map((id) => NODES_BY_ID.get(id)!)];

  let pixels = 0;
  for (let i = 1; i < points.length; i++) {
    pixels += pixelDistance(points[i - 1], points[i]);
  }

  const meters = pixels * METERS_PER_PIXEL;
  return {
    points,
    meters,
    minutes: Math.max(1, Math.round(meters / WALKING_METERS_PER_MINUTE)),
  };
}

// True when the user is close enough to the destination to count as arrived.
export function hasArrived(distanceToDestination: number | null): boolean {
  return distanceToDestination !== null && distanceToDestination <= ARRIVAL_RADIUS_METERS;
}

// For checking your traced paths on the map (used when SHOW_PATH_GRAPH is true).
export function getGraphLines(): { from: MapPoint; to: MapPoint }[] {
  return PATH_EDGES.flatMap(([idA, idB]) => {
    const a = NODES_BY_ID.get(idA);
    const b = NODES_BY_ID.get(idB);
    return a && b ? [{ from: a, to: b }] : [];
  });
}