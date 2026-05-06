import { formatDistanceToNow, format as formatDate } from 'date-fns';

const USDC_DECIMALS = 7;
const RAINFALL_SCALE = 100;
const NDVI_SCALE = 10000;
const SHARES_DECIMALS = 6;

/**
 * Format USDC amount from stroops (i128 with 7 decimals) to display string
 */
export function formatUSDC(stroops: bigint | number): string {
  const amount = Number(stroops) / Math.pow(10, USDC_DECIMALS);
  return `$${amount.toFixed(2)}`;
}

/**
 * Parse USDC display string to stroops
 */
export function parseUSDC(displayAmount: string): bigint {
  const cleaned = displayAmount.replace(/[$,]/g, '');
  const amount = parseFloat(cleaned);
  return BigInt(Math.round(amount * Math.pow(10, USDC_DECIMALS)));
}

/**
 * Format share amount (6 decimal places)
 */
export function formatShares(shares: bigint | number): string {
  const amount = Number(shares) / Math.pow(10, SHARES_DECIMALS);
  return amount.toFixed(6);
}

/**
 * Parse share display string to raw value
 */
export function parseShares(displayAmount: string): bigint {
  const amount = parseFloat(displayAmount);
  return BigInt(Math.round(amount * Math.pow(10, SHARES_DECIMALS)));
}

/**
 * Format rainfall from fixed-point (×100) to display string
 */
export function formatRainfall(value: number): string {
  const mm = value / RAINFALL_SCALE;
  return `${mm.toFixed(1)} mm`;
}

/**
 * Parse rainfall display string to fixed-point
 */
export function parseRainfall(displayValue: string): number {
  const cleaned = displayValue.replace(/[^\d.]/g, '');
  const mm = parseFloat(cleaned);
  return Math.round(mm * RAINFALL_SCALE);
}

/**
 * Format NDVI from fixed-point (×10000) to display string
 */
export function formatNDVI(value: number): string {
  const ndvi = value / NDVI_SCALE;
  return ndvi.toFixed(4);
}

/**
 * Parse NDVI display string to fixed-point
 */
export function parseNDVI(displayValue: string): number {
  const ndvi = parseFloat(displayValue);
  return Math.round(ndvi * NDVI_SCALE);
}

/**
 * Format Unix timestamp (seconds) to readable date
 */
export function formatTimestamp(timestamp: number, formatStr = 'd MMM yyyy'): string {
  return formatDate(new Date(timestamp * 1000), formatStr);
}

/**
 * Format Unix timestamp to relative time (e.g., "3 days ago")
 */
export function formatRelativeTime(timestamp: number): string {
  return formatDistanceToNow(new Date(timestamp * 1000), { addSuffix: true });
}

/**
 * Format percentage with 2 decimal places
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

/**
 * Calculate utilisation percentage
 */
export function calculateUtilisation(locked: bigint, total: bigint): number {
  if (total === BigInt(0)) return 0;
  return (Number(locked) / Number(total)) * 100;
}

/**
 * Truncate address for display
 */
export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}
