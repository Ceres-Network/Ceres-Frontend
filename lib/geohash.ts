import ngeohash from 'ngeohash';
import { GEOHASH_PRECISION } from './constants';

export interface GeoBounds {
  minLat: number;
  minLng: number;
  maxLat: number;
  maxLng: number;
}

/**
 * Encode latitude and longitude to geohash
 */
export function encodeGeohash(lat: number, lng: number, precision = GEOHASH_PRECISION): string {
  return ngeohash.encode(lat, lng, precision);
}

/**
 * Decode geohash to center coordinates
 */
export function decodeGeohash(geohash: string): { lat: number; lng: number } {
  const decoded = ngeohash.decode(geohash);
  return { lat: decoded.latitude, lng: decoded.longitude };
}

/**
 * Get bounding box for a geohash cell
 */
export function getGeohashBounds(geohash: string): GeoBounds {
  const bbox = ngeohash.decode_bbox(geohash);
  return {
    minLat: bbox[0],
    minLng: bbox[1],
    maxLat: bbox[2],
    maxLng: bbox[3],
  };
}

/**
 * Convert bounds to GeoJSON rectangle for Leaflet
 */
export function boundsToGeoJSON(bounds: GeoBounds): GeoJSON.Feature<GeoJSON.Polygon> {
  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [bounds.minLng, bounds.minLat],
          [bounds.maxLng, bounds.minLat],
          [bounds.maxLng, bounds.maxLat],
          [bounds.minLng, bounds.maxLat],
          [bounds.minLng, bounds.minLat],
        ],
      ],
    },
  };
}

/**
 * Calculate approximate cell size in km (at equator)
 */
export function getGeohashCellSize(precision: number): number {
  // Approximate cell sizes at equator
  const sizes: Record<number, number> = {
    1: 5000,
    2: 1250,
    3: 156,
    4: 39,
    5: 5,
    6: 1.2,
    7: 0.15,
  };
  return sizes[precision] || 5;
}
