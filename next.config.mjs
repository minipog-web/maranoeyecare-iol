import { imageHosts } from './image-hosts.config.mjs';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.DIST_DIR || '.next',

  images: {
    remotePatterns: imageHosts,
    minimumCacheTTL: 60,
    qualities: [85],
  },

  outputFileTracingRoot: path.resolve('.'),

  devIndicators: false,
};
export default nextConfig;