import { imageHosts } from './image-hosts.config.mjs';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.DIST_DIR || '.next',
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,

  images: {
    unoptimized: false,
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

  experimental: {
    optimizePackageImports: ['@heroicons/react', 'lucide-react', 'three', 'canvas-confetti'],
  },

  async rewrites() {
    return [
      {
        source: '/netlify-prerender-function',
        destination: '/',
      },
    ];
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
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://tagmanager.google.com https://*.googletagmanager.com https://*.google-analytics.com https://google-analytics.com https://*.googleadservices.com https://googleadservices.com https://*.doubleclick.net https://googleads.g.doubleclick.net https://*.google.com https://www.google.com https://*.callrail.com https://cdn.callrail.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' https://*.googletagmanager.com https://googletagmanager.com https://tagmanager.google.com https://*.google-analytics.com https://google-analytics.com https://*.analytics.google.com https://analytics.google.com https://*.googleadservices.com https://googleadservices.com https://*.doubleclick.net https://ad.doubleclick.net https://googleads.g.doubleclick.net https://stats.g.doubleclick.net https://*.google.com https://www.google.com https://google.com https://*.callrail.com https://cdn.callrail.com https://api.brevo.com; frame-src 'self' https://www.googletagmanager.com https://*.googletagmanager.com https://www.google.com https://*.google.com https://maps.google.com; object-src 'none'; base-uri 'self';",
          },
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
