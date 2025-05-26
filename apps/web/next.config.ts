import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import type { NextConfig } from 'next';

const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@repo/theme', '@repo/utils'],
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['kr.object.ncloudstorage.com'],
    // 필요 시 다음 설정으로 세부 경로 제어가 가능합니다.
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'kr.object.ncloudstorage.com',
    //     port: '',
    //     pathname: '/withus-file/**',
    //   },
    // ],
  },
};

export default withVanillaExtract(nextConfig);
