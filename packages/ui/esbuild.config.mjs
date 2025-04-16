import esbuild from 'esbuild';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import { preserveDirectivesPlugin } from 'esbuild-plugin-preserve-directives';

const buildOptions = {
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'node',
  plugins: [
    vanillaExtractPlugin(),
    preserveDirectivesPlugin({
      directives: ['use client', 'use strict'],
      include: /\.(js|ts|jsx|tsx)$/,
      exclude: /node_modules/,
    }),
  ],
  loader: { '.css': 'file' },
  allowOverwrite: true,
  external: ['react', 'react-dom'],
  minify: true,
  treeShaking: true,
  outdir: 'dist',
};

esbuild
  .build({
    ...buildOptions,
    resolveExtensions: ['.ts', '.tsx', '.js', '.jsx', '.css.ts'],
    format: 'esm',
  })
  .catch(() => process.exit(1));
