// BUSINESS LAYER: Dijkstra's algorithm, which finds the shortest path through the walkway network.
// It knows nothing about maps or screens, only nodes and costs.
export type Adjacency = Map<string, { to: string; cost: number }[]>;

export function dijkstra(adjacency: Adjacency, start: string, end: string): string[] | null {
  const dist = new Map<string, number>();
  const prev = new Map<string, string>();
  const unvisited = new Set<string>();

  adjacency.forEach((_, id) => {
    dist.set(id, Infinity);
    unvisited.add(id);
  });
  if (!dist.has(start) || !dist.has(end)) return null;
  dist.set(start, 0);

  while (unvisited.size > 0) {
    // Pick the unvisited node with the smallest distance so far.
    let current: string | null = null;
    for (const id of unvisited) {
      if (current === null || dist.get(id)! < dist.get(current)!) current = id;
    }
    if (current === null || dist.get(current) === Infinity) return null; // unreachable
    if (current === end) break;
    unvisited.delete(current);

    for (const edge of adjacency.get(current) ?? []) {
      const alt = dist.get(current)! + edge.cost;
      if (alt < (dist.get(edge.to) ?? Infinity)) {
        dist.set(edge.to, alt);
        prev.set(edge.to, current);
      }
    }
  }

  if (start !== end && !prev.has(end)) return null;

  // Walk backwards from the end to rebuild the path.
  const path = [end];
  let step = end;
  while (prev.has(step)) {
    step = prev.get(step)!;
    path.unshift(step);
  }
  return path;
}