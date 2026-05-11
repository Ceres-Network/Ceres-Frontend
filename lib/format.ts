const USDC_DECIMALS = 7;

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
 * Format Unix timestamp (seconds) to readable date
 * TODO: Implement proper date formatting
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString();
}

/**
 * Truncate address for display
 */
export function truncateAddress(address: string, startChars = 6, endChars = 4): string {
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}
