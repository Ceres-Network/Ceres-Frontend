// TODO: Implement policy data fetching
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
 * Hook to fetch farmer policies
 * TODO: Implement SWR data fetching
 */
export function usePolicies(): UsePoliciesResult {
  return {
    policies: [],
    isLoading: false,
    error: undefined,
    mutate: async () => {},
  };
}

/**
 * Hook to fetch a single policy by ID
 * TODO: Implement policy fetching
 */
export function usePolicy(_policyId: string | null): {
  policy: Policy | undefined;
  isLoading: boolean;
  error: Error | undefined;
  mutate: () => Promise<void>;
} {
  return {
    policy: undefined,
    isLoading: false,
    error: undefined,
    mutate: async () => {},
  };
}
