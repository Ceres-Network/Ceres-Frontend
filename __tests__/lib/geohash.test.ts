import { describe, it, expect } from 'vitest';
import {
  encodeGeohash,
  decodeGeohash,
  getGeohashBounds,
  getGeohashCellSize,
} from '@/lib/geohash';

describe('geohash utilities', () => {
  describe('encodeGeohash', () => {
    it('should encode coordinates to geohash', () => {
      const geohash = encodeGeohash(9.0, 8.0, 5);
      expect(geohash).toBe('s00tw');
      expect(geohash.length).toBe(5);
    });

    it('should use default precision', () => {
      const geohash = encodeGeohash(9.0, 8.0);
      expect(geohash.length).toBe(5);
    });
  });

  describe('decodeGeohash', () => {
    it('should decode geohash to coordinates', () => {
      const coords = decodeGeohash('s00tw');
      expect(coords.lat).toBeCloseTo(9.0, 1);
      expect(coords.lng).toBeCloseTo(8.0, 1);
    });
  });

  describe('getGeohashBounds', () => {
    it('should return bounding box for geohash', () => {
      const bounds = getGeohashBounds('s00tw');
      expect(bounds.minLat).toBeLessThan(bounds.maxLat);
      expect(bounds.minLng).toBeLessThan(bounds.maxLng);
    });
  });

  describe('getGeohashCellSize', () => {
    it('should return approximate cell size', () => {
      expect(getGeohashCellSize(5)).toBe(5);
      expect(getGeohashCellSize(4)).toBe(39);
      expect(getGeohashCellSize(3)).toBe(156);
    });
  });
});
