import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const currentDir = dirname(fileURLToPath(import.meta.url));

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/ui/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-actions'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/experimental-addon-test'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  viteFinal: async (config) => {
    config.plugins = [
      vanillaExtractPlugin(),
      ...(config.plugins || []),
      tsconfigPaths(),
    ];

    config.resolve = {
      ...(config.resolve || {}),
      alias: {
        //'@': resolve(__dirname, '../src'),
        '@repo/theme': resolve(currentDir, '../../../packages/theme'),
        '@repo/utils': resolve(currentDir, '../../../packages/utils'),
      },
    };

    config.optimizeDeps = {
      ...(config.optimizeDeps || {}),
      include: ['@repo/theme', '@repo/utils'],
      esbuildOptions: {
        plugins: [],
      },
    };

    return config;
  },
};

export default config;
