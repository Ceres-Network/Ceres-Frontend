export const STELLAR_NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK as 'testnet' | 'mainnet';
export const HORIZON_URL = process.env.NEXT_PUBLIC_HORIZON_URL!;
export const SOROBAN_RPC_URL = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL!;
export const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export const CONTRACT_ADDRESSES = {
  pool: process.env.NEXT_PUBLIC_POOL_CONTRACT!,
  policy: process.env.NEXT_PUBLIC_POLICY_CONTRACT!,
  oracle: process.env.NEXT_PUBLIC_ORACLE_CONTRACT!,
  trigger: process.env.NEXT_PUBLIC_TRIGGER_CONTRACT!,
};

export const USDC_ASSET = {
  code: process.env.NEXT_PUBLIC_USDC_ASSET_CODE!,
  issuer: process.env.NEXT_PUBLIC_USDC_ISSUER!,
};

export const CROP_TYPES = [
  { value: 'maize', label: 'Maize' },
  { value: 'sorghum', label: 'Sorghum' },
  { value: 'wheat', label: 'Wheat' },
  { value: 'cassava', label: 'Cassava' },
  { value: 'rice', label: 'Rice' },
] as const;

export const GEOHASH_PRECISION = 5;

export const COVERAGE_LIMITS = {
  min: 50,
  max: 5000,
};

export const DEFAULT_MAP_CENTER = {
  lat: 9.0,
  lng: 8.0,
  zoom: 5,
};

export const PREMIUM_RATE = 0.02; // 2% of coverage amount
