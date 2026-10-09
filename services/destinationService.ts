// SERVICE LAYER: Provides the campus destination list.
// Uses centralized data instead of duplicating building records.

import { DESTINATIONS } from '../data/destinations';

const destinations = [...DESTINATIONS].sort(
  (a, b) => a.number - b.number
);

export default destinations;