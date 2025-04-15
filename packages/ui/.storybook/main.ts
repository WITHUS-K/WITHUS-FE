import type { StorybookConfig } from '@storybook/react-vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { join, dirname, resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
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
        '@repo/theme': resolve(__dirname, '../../../packages/theme'),
      },
    };

    config.optimizeDeps = {
      ...(config.optimizeDeps || {}),
      include: ['@repo/theme'],
      esbuildOptions: {
        plugins: [],
      },
    };
    return config;
  },
};

export default config;
