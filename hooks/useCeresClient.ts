import { getCeresClient } from '@/lib/ceres-client';
import type { CeresClient } from '@/lib/sdk-mock';

/**
 * Hook to access the singleton CeresClient instance
 */
export function useCeresClient(): CeresClient {
  return getCeresClient();
}
