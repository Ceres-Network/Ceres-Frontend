import { describe, it, expect } from 'vitest';
import {
  formatUSDC,
  parseUSDC,
  truncateAddress,
} from '@/lib/format';

describe('format utilities', () => {
  describe('USDC formatting', () => {
    it('should format USDC stroops to display string', () => {
      expect(formatUSDC(BigInt(10000000))).toBe('$1.00');
      expect(formatUSDC(BigInt(50000000))).toBe('$5.00');
    });

    it('should parse USDC display string to stroops', () => {
      expect(parseUSDC('1.00')).toBe(BigInt(10000000));
      expect(parseUSDC('$5.00')).toBe(BigInt(50000000));
    });
  });

  describe('Address truncation', () => {
    it('should truncate long addresses', () => {
      const address = 'GABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
      expect(truncateAddress(address)).toBe('GABCDE...7890');
    });

    it('should not truncate short addresses', () => {
      const address = 'GABCD';
      expect(truncateAddress(address)).toBe('GABCD');
    });
  });
});
