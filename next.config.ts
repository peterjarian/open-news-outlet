import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: '/admin',
      destination: '/admin/dashboard',
      permanent: true,
    },
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '5222kb', // 5.1mb
    },
  },
};

export default nextConfig;
