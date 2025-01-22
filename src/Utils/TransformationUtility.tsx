import proj4 from 'proj4';

const palestine1923 = '+proj=cass +lat_0=31.73409694444445 +lon_0=35.21208055555556 +x_0=170251.555 +y_0=1126867.909 +datum=palestine +units=m +no_defs';
const wgs84WebMercator = 'EPSG:3857';

export const transformCoordinates = (geometry) => {
  if (!geometry.rings || !Array.isArray(geometry.rings)) {
    throw new Error("Invalid geometry: 'rings' property is missing or not an array");
  }

  const transformedRings = geometry.rings.map(ring =>
    ring.map(coord => proj4(palestine1923, wgs84WebMercator, coord))
  );

  return {
    ...geometry, // Keep everything else the same
    rings: transformedRings // Update only the rings
  };
};