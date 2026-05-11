// TODO: Implement pool statistics fetching
export interface PoolStats {
  totalCapital: bigint;
  totalLocked: bigint;
  freeCapital: bigint;
  utilisation: number;
  totalShares: bigint;
}

export interface LPPosition {
  shares: bigint;
  usdcValue: bigint;
}

interface UsePoolStatsResult {
  stats: PoolStats | undefined;
  isLoading: boolean;
  error: Error | undefined;
  mutate: () => Promise<void>;
}

/**
 * Hook to fetch pool statistics
 * TODO: Implement real data fetching
 */
export function usePoolStats(): UsePoolStatsResult {
  // Mock data for now
  const mockStats: PoolStats = {
    totalCapital: BigInt(0),
    totalLocked: BigInt(0),
    freeCapital: BigInt(0),
    utilisation: 0,
    totalShares: BigInt(0),
  };

  return {
    stats: mockStats,
    isLoading: false,
    error: undefined,
    mutate: async () => {},
  };
}

/**
 * Hook to fetch LP position
 * TODO: Implement position fetching
 */
export function useLPPosition(): {
  position: LPPosition | undefined;
  isLoading: boolean;
  error: Error | undefined;
  mutate: () => Promise<void>;
} {
  return {
    position: undefined,
    isLoading: false,
    error: undefined,
    mutate: async () => {},
  };
}
