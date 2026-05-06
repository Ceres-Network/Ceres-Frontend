import useSWR from 'swr';
import { useCeresClient } from './useCeresClient';
import { useWallet } from '@/components/wallet/WalletProvider';

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
 * Fetch and cache pool statistics with 15-second polling
 */
export function usePoolStats(): UsePoolStatsResult {
  const client = useCeresClient();

  const { data, error, isLoading, mutate } = useSWR<PoolStats>(
    'pool-stats',
    async () => {
      return await client.getPoolStats();
    },
    {
      refreshInterval: 15000, // Refresh every 15 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    stats: data,
    isLoading,
    error,
    mutate: async () => {
      await mutate();
    },
  };
}

/**
 * Fetch LP position for connected wallet
 */
export function useLPPosition(): {
  position: LPPosition | undefined;
  isLoading: boolean;
  error: Error | undefined;
  mutate: () => Promise<void>;
} {
  const client = useCeresClient();
  const { address, isConnected } = useWallet();

  const { data, error, isLoading, mutate } = useSWR<LPPosition>(
    isConnected && address ? ['lp-position', address] : null,
    async () => {
      if (!address) throw new Error('Wallet not connected');
      return await client.getLPPosition(address);
    },
    {
      refreshInterval: 15000,
      revalidateOnFocus: true,
    }
  );

  return {
    position: data,
    isLoading,
    error,
    mutate: async () => {
      await mutate();
    },
  };
}
