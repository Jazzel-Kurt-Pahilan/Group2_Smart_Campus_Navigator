// services/mapPins.ts  [DATA layer]
// Pin data for the interactive Campus Map screen.
// Separate from services/destinationService.ts (used by the Destinations list screen) —
// worth syncing into one shared source with the group later, but kept independent for now
// so this doesn't require editing anyone else's file.

export type Pin = {
  id: string;
  number: number;
  name: string;
  category: string;
  x: number; // position on the map image, in percent (0-100)
  y: number; // position on the map image, in percent (0-100)
  latitude: number | null; // null until verified on Google Maps
  longitude: number | null;
};

export const mapPins: Pin[] = [
  { id: 'b1', number: 1, name: 'Arts & Culture Building', category: 'N/A', x: 81.4, y: 40.7, latitude: 8.4863819, longitude: 124.6572223 },
  { id: 'b2', number: 2, name: 'Guidance and Testing Center', category: 'N/A', x: 91.4, y: 55.7, latitude: 8.4863819, longitude: 124.6572223 },
  { id: 'b3', number: 3, name: 'College of Medicine', category: 'N/A', x: 21.4, y: 40.7, latitude: 8.4863819, longitude: 124.6572223 },
  { id: 'b5', number: 5, name: 'Old Engineering Building', category: 'N/A', x: 11.4, y: 40.7, latitude: 8.4863819, longitude: 124.6572223 },
  { id: 'b9', number: 9, name: 'ICT Building', category: 'Academic', x: 71.4, y: 35.7, latitude: 8.4863819, longitude: 124.6572223 },
  { id: 'b10', number: 10, name: 'Administration Building', category: 'Admin', x: 68.6, y: 41.6, latitude: 8.4860064, longitude: 124.6572855 },
  { id: 'b14', number: 14, name: 'Finance and Accounting Building/ Senior High School Building', category: 'N/A', x: 31.4, y: 40.7, latitude: 8.4863819, longitude: 124.6572223 },
  { id: 'b15', number: 15, name: 'Gymnasium Lobby', category: 'N/A', x: 41.4, y: 40.7, latitude: 8.4863819, longitude: 124.6572223 },
  { id: 'b16', number: 16, name: 'Gymnasium / DRER Memorial Hall', category: 'Landmark', x: 56.4, y: 44.8, latitude: 8.4858884, longitude: 124.6566799 },
  { id: 'b18', number: 18, name: 'Building 18', category: 'N/A', x: 61.4, y: 40.7, latitude: 8.4863819, longitude: 124.6572223 },
  { id: 'b19', number: 19, name: 'Building 19', category: 'N/A', x: 63.4, y: 45.7, latitude: 8.4863819, longitude: 124.6572223 },
  { id: 'b41', number: 41, name: 'Science Complex', category: 'Academic', x: 43.8, y: 49.1, latitude: 8.4856414, longitude: 124.6560284 },
  { id: 'b42', number: 42, name: 'Engineering Complex I', category: 'Academic', x: 64.2, y: 65.2, latitude: 8.4848518, longitude: 124.6570393 },
  { id: 'b43', number: 43, name: 'Engineering Complex II', category: 'Academic', x: 56.9, y: 65.8, latitude: null, longitude: null },
  { id: 'b23', number: 23, name: 'Learning Resource Center', category: 'Academic', x: 37.0, y: 27.5, latitude: null, longitude: null },
  { id: 'b47', number: 47, name: 'Technology Building', category: 'Academic', x: 28.3, y: 23.5, latitude: null, longitude: null },
  { id: 'b44', number: 44, name: 'Student Center & Education Complex', category: 'Services', x: 38.2, y: 60.1, latitude: null, longitude: null },
  { id: 'b20', number: 20, name: 'Cafeteria', category: 'Commercial', x: 57.9, y: 59.4, latitude: null, longitude: null },
  { id: 'b51', number: 51, name: 'Dormitory', category: 'Residential', x: 44.2, y: 15.0, latitude: null, longitude: null },
];