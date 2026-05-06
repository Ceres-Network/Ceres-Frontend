import useSWR from 'swr';
import { useCeresClient } from './useCeresClient';

export type ReadingType = 'rainfall' | 'ndvi';

export interface OracleReading {
  id: string;
  geohash: string;
  readingType: ReadingType;
  value: number;
  timestamp: number;
  submitter: string;
  status: 'accepted' | 'rejected' | 'too_old';
}

export interface AggregatedReading {
  geohash: string;
  rainfall: number;
  ndvi: number;
  lastUpdated: number;
}

interface UseOracleReadingsResult {
  readings: OracleReading[] | undefined;
  isLoading: boolean;
  error: Error | undefined;
  mutate: () => Promise<void>;
}

/**
 * Fetch oracle reading history
 */
export function useOracleReadings(limit = 20): UseOracleReadingsResult {
  const client = useCeresClient();

  const { data, error, isLoading, mutate } = useSWR<OracleReading[]>(
    ['oracle-readings', limit],
    async () => {
      return await client.getOracleReadings(limit);
    },
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: true,
    }
  );

  return {
    readings: data,
    isLoading,
    error,
    mutate: async () => {
      await mutate();
    },
  };
}

/**
 * Fetch aggregated readings for a specific geo-cell
 */
export function useAggregatedReadings(geohash: string | null): {
  readings: AggregatedReading | undefined;
  isLoading: boolean;
  error: Error | undefined;
  mutate: () => Promise<void>;
} {
  const client = useCeresClient();

  const { data, error, isLoading, mutate } = useSWR<AggregatedReading>(
    geohash ? ['aggregated-readings', geohash] : null,
    async () => {
      if (!geohash) throw new Error('Geohash is required');
      return await client.getAggregatedReadings(geohash);
    },
    {
      refreshInterval: 30000,
      revalidateOnFocus: true,
    }
  );

  return {
    readings: data,
    isLoading,
    error,
    mutate: async () => {
      await mutate();
    },
  };
}

/**
 * Fetch node health stats for connected wallet
 */
export function useNodeHealth(address: string | null): {
  health: {
    submissionsLast24h: number;
    trackedCells: string[];
    medianValues: Record<string, number>;
  } | undefined;
  isLoading: boolean;
  error: Error | undefined;
} {
  const client = useCeresClient();

  const { data, error, isLoading } = useSWR(
    address ? ['node-health', address] : null,
    async () => {
      if (!address) throw new Error('Address is required');
      return await client.getNodeHealth(address);
    },
    {
      refreshInterval: 60000,
      revalidateOnFocus: true,
    }
  );

  return {
    health: data,
    isLoading,
    error,
  };
}
