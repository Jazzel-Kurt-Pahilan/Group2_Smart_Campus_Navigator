// DATA LAYER: campus buildings.
// mapX / mapY = pixel position of the building number on the map image (used for pins and routes).
// latitude / longitude = real GPS (used for distance).
// gpsEstimated = GPS was calculated from the map position, not measured. Re-measure on campus and delete the flag.
import { Destination } from '../types';

export const DESTINATIONS: Destination[] = [
  { id: 'b1', number: 1, name: 'Arts & Culture Building', category: 'Cultural', latitude: 8.48622, longitude: 124.65838, mapX: 1153, mapY: 469, gpsEstimated: true },
  { id: 'b2', number: 2, name: 'Guidance and Testing Center', category: 'Services', latitude: 8.48627, longitude: 124.65821, mapX: 1108, mapY: 453, gpsEstimated: true },
  { id: 'b3', number: 3, name: 'College of Medicine', category: 'Academic', latitude: 8.48601, longitude: 124.65810, mapX: 1077, mapY: 524, gpsEstimated: true },
  { id: 'b5', number: 5, name: 'Old Engineering Building', category: 'Academic', latitude: 8.48587, longitude: 124.65765, mapX: 935, mapY: 585 },
  { id: 'b9', number: 9, name: 'ICT Building', category: 'Academic', latitude: 8.48613, longitude: 124.65716, mapX: 888, mapY: 443 },
  { id: 'b10', number: 10, name: 'Administration Building', category: 'Administrative', latitude: 8.48594, longitude: 124.65716, mapX: 852, mapY: 517 },
  { id: 'b14', number: 14, name: 'Senior High School Building', category: 'Academic', latitude: 8.48630, longitude: 124.65701, mapX: 740, mapY: 441 },
  { id: 'b15', number: 15, name: 'Gymnasium Lobby', category: 'Sports', latitude: 8.48607, longitude: 124.65647, mapX: 648, mapY: 494, gpsEstimated: true },
  { id: 'b16', number: 16, name: 'Gymnasium / DRER Memorial Hall', category: 'Sports', latitude: 8.48585, longitude: 124.65668, mapX: 699, mapY: 557, gpsEstimated: true },
  { id: 'b18', number: 18, name: 'Culinary Building', category: 'Academic', latitude: 8.48564, longitude: 124.65694, mapX: 820, mapY: 672 },
  { id: 'b19', number: 19, name: 'NSTP Building', category: 'Academic', latitude: 8.48499, longitude: 124.65707, mapX: 827, mapY: 762 },
  { id: 'b20', number: 20, name: 'Cafeteria', category: 'Dining', latitude: 8.48524, longitude: 124.65695, mapX: 718, mapY: 738 },
  { id: 'b21', number: 21, name: 'Guard House', category: 'Security', latitude: 8.48496, longitude: 124.65655, mapX: 628, mapY: 799 },
  { id: 'b23', number: 23, name: 'Learning Resource Center', category: 'Services', latitude: 8.48652, longitude: 124.65573, mapX: 459, mapY: 341 },
  { id: 'b24', number: 24, name: "Girl's Trade Building", category: 'Academic', latitude: 8.48628, longitude: 124.65521, mapX: 359, mapY: 438 },
  { id: 'b25', number: 25, name: 'Food Innovation Center', category: 'Academic', latitude: 8.48615, longitude: 124.65593, mapX: 482, mapY: 452 },
  { id: 'b26', number: 26, name: 'Food Innovation Center (2)', category: 'Academic', latitude: 8.48635, longitude: 124.65603, mapX: 535, mapY: 413, gpsEstimated: true },
  { id: 'b27', number: 27, name: 'University Health Center / OSA', category: 'Services', latitude: 8.48613, longitude: 124.65562, mapX: 427, mapY: 519 },
  { id: 'b28', number: 28, name: 'Old Science Building', category: 'Academic', latitude: 8.48589, longitude: 124.65591, mapX: 497, mapY: 538, gpsEstimated: true },
  { id: 'b35', number: 35, name: 'Old Education Building', category: 'Academic', latitude: 8.48579, longitude: 124.65526, mapX: 326, mapY: 560, gpsEstimated: true },
  { id: 'b36', number: 36, name: 'Old Student Center', category: 'Student Services', latitude: 8.48610, longitude: 124.65512, mapX: 292, mapY: 474, gpsEstimated: true },
  { id: 'b41', number: 41, name: 'Science Complex', category: 'Academic', latitude: 8.48564, longitude: 124.65609, mapX: 543, mapY: 610, gpsEstimated: true },
  { id: 'b42', number: 42, name: 'Engineering Complex I (Right Wing)', category: 'Academic', latitude: 8.48493, longitude: 124.65712, mapX: 796, mapY: 810 },
  { id: 'b43', number: 43, name: 'Engineering Complex II (Left Wing)', category: 'Academic', latitude: 8.48491, longitude: 124.65675, mapX: 707, mapY: 816, gpsEstimated: true },
  { id: 'b44', number: 44, name: 'Student Center & Education Complex', category: 'Student Services', latitude: 8.48514, longitude: 124.65586, mapX: 475, mapY: 747, gpsEstimated: true },
  { id: 'b45', number: 45, name: 'Mechanical Laboratory Shop', category: 'Academic', latitude: 8.48660, longitude: 124.65532, mapX: 253, mapY: 380 },
  { id: 'b47', number: 47, name: 'Technology Building', category: 'Academic', latitude: 8.48654, longitude: 124.65509, mapX: 351, mapY: 291 },
  { id: 'b51', number: 51, name: 'Dormitory', category: 'Residential', latitude: 8.48717, longitude: 124.65605, mapX: 548, mapY: 185, gpsEstimated: true },
  { id: 'b52', number: 52, name: 'Fab Lab Building', category: 'Academic', latitude: 8.48672, longitude: 124.65490, mapX: 240, mapY: 300, gpsEstimated: true },
];