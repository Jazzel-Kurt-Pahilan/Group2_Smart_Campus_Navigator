// DATA LAYER: facts about the campus map image.
// IMPORTANT: every pixel number in this project (pins, paths) was measured on a 1242 x 968 picture.
// Use that exact picture. A resized copy also works as long as it keeps the SAME SHAPE (width:height ratio).
export const MAP_IMAGE = {
  source: require('../assets/campus_img/campusmap.png'), // must match your real file name and extension
  width: 1242,
  height: 968,
};

// Best-fit conversion from GPS to image pixels (least squares over 15 measured buildings).
// pixelX = x[0] * longitude + x[1] * latitude + x[2]   (same pattern for y)
// Only the blue "you are here" dot uses this. Pins and paths use pixels directly.
export const MAP_AFFINE = {
  x: [263638.31317398587, 11135.439737122972, -32958070.339581348],
  y: [8652.3540545095, -276617.08286918706, 1269314.0045268247],
};

// About 2.44 pixels per meter on this picture, so one pixel is about 0.41 m.
export const METERS_PER_PIXEL = 0.41;