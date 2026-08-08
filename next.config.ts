import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.cdn.australia-southeast1.gcp.commercetools.com',
      },
    ],
  },
};

export default nextConfig;
