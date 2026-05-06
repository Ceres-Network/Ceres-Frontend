import { getCeresClient } from '@/lib/ceres-client';
import type { CeresClient } from '@ceres-network/sdk';

/**
 * Hook to access the singleton CeresClient instance
 */
export function useCeresClient(): CeresClient {
  return getCeresClient();
}
