import { API_URL } from './constants';

/**
 * API Client for Ceres Backend
 * 
 * The backend provides indexed contract data and proxied weather lookups.
 * Repository: https://github.com/Ceres-Network/Ceres-backend
 * 
 * Architecture:
 * - Event Indexer: Indexes Soroban contract events to PostgreSQL
 * - Oracle Feeder: Automated weather data submission
 * - REST API: Serves historical data and proxies weather lookups
 */

interface ApiResponse<T> {
  data: T;
  error?: string;
}

/**
 * Base fetch wrapper with error handling
 */
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result: ApiResponse<T> = await response.json();
    
    if (result.error) {
      throw new Error(result.error);
    }

    return result.data;
  } catch (error) {
    console.error(`API request failed: ${endpoint}`, error);
    throw error;
  }
}

/**
 * Policy API endpoints
 * TODO: Implement once backend API is available
 */
export const policyApi = {
  /**
   * Get all policies for a farmer address
   * GET /api/policies?farmer={address}
   */
  listByFarmer: async (farmerAddress: string) => {
    return apiFetch(`/api/policies?farmer=${farmerAddress}`);
  },

  /**
   * Get a single policy by ID
   * GET /api/policies/{id}
   */
  getById: async (policyId: string) => {
    return apiFetch(`/api/policies/${policyId}`);
  },
};

/**
 * Pool API endpoints
 * TODO: Implement once backend API is available
 */
export const poolApi = {
  /**
   * Get current pool statistics
   * GET /api/pool/stats
   */
  getStats: async () => {
    return apiFetch('/api/pool/stats');
  },

  /**
   * Get pool statistics history
   * GET /api/pool/stats/history
   */
  getStatsHistory: async () => {
    return apiFetch('/api/pool/stats/history');
  },

  /**
   * Get LP position for an address
   * GET /api/pool/position/{address}
   */
  getPosition: async (address: string) => {
    return apiFetch(`/api/pool/position/${address}`);
  },
};

/**
 * Oracle API endpoints
 * TODO: Implement once backend API is available
 */
export const oracleApi = {
  /**
   * Get latest oracle readings for a geohash
   * GET /api/oracle/readings?geohash={hash}
   */
  getReadings: async (geohash: string) => {
    return apiFetch(`/api/oracle/readings?geohash=${geohash}`);
  },

  /**
   * Get oracle reading history
   * GET /api/oracle/readings/history?limit={limit}
   */
  getReadingHistory: async (limit = 20) => {
    return apiFetch(`/api/oracle/readings/history?limit=${limit}`);
  },

  /**
   * Get weather data lookup (proxied through backend)
   * GET /api/weather/lookup?geohash={hash}
   */
  getWeatherLookup: async (geohash: string) => {
    return apiFetch(`/api/weather/lookup?geohash=${geohash}`);
  },
};

/**
 * Events API endpoints
 * TODO: Implement once backend API is available
 */
export const eventsApi = {
  /**
   * Get payout events
   * GET /api/events/payouts
   */
  getPayouts: async () => {
    return apiFetch('/api/events/payouts');
  },

  /**
   * Get all indexed events
   * GET /api/events?limit={limit}
   */
  getAll: async (limit = 50) => {
    return apiFetch(`/api/events?limit=${limit}`);
  },
};

/**
 * Trigger API endpoints
 * TODO: Implement once backend API is available
 */
export const triggerApi = {
  /**
   * Get trigger event for a policy
   * GET /api/trigger/{policyId}
   */
  getTriggerEvent: async (policyId: string) => {
    return apiFetch(`/api/trigger/${policyId}`);
  },

  /**
   * Check if a policy is triggered
   * GET /api/trigger/{policyId}/status
   */
  isTriggered: async (policyId: string) => {
    return apiFetch(`/api/trigger/${policyId}/status`);
  },
};
