// TODO: Implement oracle reading data fetching
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
 * Hook to fetch oracle reading history
 * TODO: Implement data fetching
 */
export function useOracleReadings(_limit = 20): UseOracleReadingsResult {
  return {
    readings: [],
    isLoading: false,
    error: undefined,
    mutate: async () => {},
  };
}

/**
 * Hook to fetch aggregated readings for a geo-cell
 * TODO: Implement aggregated readings
 */
export function useAggregatedReadings(_geohash: string | null): {
  readings: AggregatedReading | undefined;
  isLoading: boolean;
  error: Error | undefined;
  mutate: () => Promise<void>;
} {
  return {
    readings: undefined,
    isLoading: false,
    error: undefined,
    mutate: async () => {},
  };
}

/**
 * Hook to fetch node health stats
 * TODO: Implement node health tracking
 */
export function useNodeHealth(_address: string | null): {
  health: {
    submissionsLast24h: number;
    trackedCells: string[];
    medianValues: Record<string, number>;
  } | undefined;
  isLoading: boolean;
  error: Error | undefined;
} {
  return {
    health: undefined,
    isLoading: false,
    error: undefined,
  };
}
