import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/theme', '@repo/utils'],
  experimental: {
    scrollRestoration: true,
  },
};

export default withVanillaExtract(nextConfig);
