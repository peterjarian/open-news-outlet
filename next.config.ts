import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '5222kb', // 5.1mb
    },
  },
};

export default nextConfig;
