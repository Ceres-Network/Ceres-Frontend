import ngeohash from 'ngeohash';
import { GEOHASH_PRECISION } from './constants';

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

// TODO: Implement geohash bounds and GeoJSON conversion
