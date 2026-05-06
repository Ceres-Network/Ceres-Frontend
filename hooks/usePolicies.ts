import useSWR from 'swr';
import { useCeresClient } from './useCeresClient';
import { useWallet } from '@/components/wallet/WalletProvider';

export interface Policy {
  id: string;
  farmer: string;
  geohash: string;
  cropType: string;
  seasonStart: number;
  seasonEnd: number;
  coverageAmount: bigint;
  premium: bigint;
  rainfallThreshold: number;
  ndviBaseline: number;
  status: 'active' | 'triggered' | 'expired';
  payoutAmount?: bigint;
  payoutTimestamp?: number;
}

interface UsePoliciesResult {
  policies: Policy[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
  mutate: () => Promise<void>;
}

/**
 * Fetch and cache farmer policies with SWR
 */
export function usePolicies(): UsePoliciesResult {
  const client = useCeresClient();
  const { address, isConnected } = useWallet();

  const { data, error, isLoading, mutate } = useSWR<Policy[]>(
    isConnected && address ? ['policies', address] : null,
    async () => {
      if (!address) return [];
      return await client.listFarmerPolicies(address);
    },
    {
      refreshInterval: 60000, // Refresh every 60 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    policies: data,
    isLoading,
    error,
    mutate: async () => {
      await mutate();
    },
  };
}

/**
 * Fetch a single policy by ID
 */
export function usePolicy(policyId: string | null): {
  policy: Policy | undefined;
  isLoading: boolean;
  error: Error | undefined;
  mutate: () => Promise<void>;
} {
  const client = useCeresClient();

  const { data, error, isLoading, mutate } = useSWR<Policy>(
    policyId ? ['policy', policyId] : null,
    async () => {
      if (!policyId) throw new Error('Policy ID is required');
      return await client.getPolicy(policyId);
    },
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
    }
  );

  return {
    policy: data,
    isLoading,
    error,
    mutate: async () => {
      await mutate();
    },
  };
}
