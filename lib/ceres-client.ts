import { CeresClient } from '@ceres-network/sdk';
import { CONTRACT_ADDRESSES, STELLAR_NETWORK } from './constants';

let ceresClientInstance: CeresClient | null = null;

/**
 * Get singleton CeresClient instance
 */
export function getCeresClient(): CeresClient {
  if (!ceresClientInstance) {
    ceresClientInstance = new CeresClient({
      network: STELLAR_NETWORK,
      poolContract: CONTRACT_ADDRESSES.pool,
      policyContract: CONTRACT_ADDRESSES.policy,
      oracleContract: CONTRACT_ADDRESSES.oracle,
      triggerContract: CONTRACT_ADDRESSES.trigger,
    });
  }
  return ceresClientInstance;
}

/**
 * Reset client instance (useful for testing or network changes)
 */
export function resetCeresClient(): void {
  ceresClientInstance = null;
}
