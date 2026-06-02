import { imageHosts } from './image-hosts.config.mjs';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.DIST_DIR || '.next',

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: imageHosts,
    minimumCacheTTL: 60,
  },

  outputFileTracingRoot: path.resolve('.'),
};
export default nextConfig;