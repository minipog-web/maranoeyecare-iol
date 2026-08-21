import { imageHosts } from './image-hosts.config.mjs';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.DIST_DIR || '.next',
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  images: {
    remotePatterns: imageHosts,
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    qualities: [80, 85, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  async headers() {
    return [
      {
        source: '/assets/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  outputFileTracingRoot: path.resolve('.'),
  devIndicators: false,
};

export default nextConfig;