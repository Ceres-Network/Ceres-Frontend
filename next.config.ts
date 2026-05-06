import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Fix for Leaflet SSR issues
    config.resolve.alias = {
      ...config.resolve.alias,
      'leaflet': require.resolve('leaflet'),
    };
    return config;
  },
};

export default nextConfig;
