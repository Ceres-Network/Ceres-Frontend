import { describe, it, expect } from 'vitest';
import {
  formatUSDC,
  parseUSDC,
  formatShares,
  parseShares,
  formatRainfall,
  parseRainfall,
  formatNDVI,
  parseNDVI,
  formatPercentage,
  calculateUtilisation,
  truncateAddress,
} from '@/lib/format';

describe('format utilities', () => {
  describe('USDC formatting', () => {
    it('should format USDC stroops to display string', () => {
      expect(formatUSDC(BigInt(10000000))).toBe('$1.00');
      expect(formatUSDC(BigInt(50000000))).toBe('$5.00');
      expect(formatUSDC(BigInt(12345678))).toBe('$1.23');
    });

    it('should parse USDC display string to stroops', () => {
      expect(parseUSDC('1.00')).toBe(BigInt(10000000));
      expect(parseUSDC('$5.00')).toBe(BigInt(50000000));
      expect(parseUSDC('1.23')).toBe(BigInt(12300000));
    });
  });

  describe('Shares formatting', () => {
    it('should format shares with 6 decimal places', () => {
      expect(formatShares(BigInt(1000000))).toBe('1.000000');
      expect(formatShares(BigInt(1234567))).toBe('1.234567');
    });

    it('should parse shares display string', () => {
      expect(parseShares('1.000000')).toBe(BigInt(1000000));
      expect(parseShares('1.234567')).toBe(BigInt(1234567));
    });
  });

  describe('Rainfall formatting', () => {
    it('should format rainfall from fixed-point', () => {
      expect(formatRainfall(41250)).toBe('412.5 mm');
      expect(formatRainfall(10000)).toBe('100.0 mm');
    });

    it('should parse rainfall to fixed-point', () => {
      expect(parseRainfall('412.5')).toBe(41250);
      expect(parseRainfall('100.0 mm')).toBe(10000);
    });
  });

  describe('NDVI formatting', () => {
    it('should format NDVI from fixed-point', () => {
      expect(formatNDVI(6500)).toBe('0.6500');
      expect(formatNDVI(8000)).toBe('0.8000');
    });

    it('should parse NDVI to fixed-point', () => {
      expect(parseNDVI('0.6500')).toBe(6500);
      expect(parseNDVI('0.8000')).toBe(8000);
    });
  });

  describe('Percentage formatting', () => {
    it('should format percentage with 2 decimal places', () => {
      expect(formatPercentage(45.678)).toBe('45.68%');
      expect(formatPercentage(100)).toBe('100.00%');
    });
  });

  describe('Utilisation calculation', () => {
    it('should calculate utilisation percentage', () => {
      expect(calculateUtilisation(BigInt(50), BigInt(100))).toBe(50);
      expect(calculateUtilisation(BigInt(75), BigInt(100))).toBe(75);
    });

    it('should return 0 for zero total', () => {
      expect(calculateUtilisation(BigInt(50), BigInt(0))).toBe(0);
    });
  });

  describe('Address truncation', () => {
    it('should truncate long addresses', () => {
      const address = 'GABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
      expect(truncateAddress(address)).toBe('GABCDE...7890');
      expect(truncateAddress(address, 4, 4)).toBe('GABC...7890');
    });

    it('should not truncate short addresses', () => {
      const address = 'GABCD';
      expect(truncateAddress(address)).toBe('GABCD');
    });
  });
});
