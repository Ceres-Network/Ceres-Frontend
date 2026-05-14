/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Fix for Leaflet SSR issues (only if leaflet is installed)
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    // Suppress warnings for optional dependencies
    config.ignoreWarnings = [
      { module: /node_modules\/leaflet/ },
    ];
    
    return config;
  },
};

module.exports = nextConfig;
