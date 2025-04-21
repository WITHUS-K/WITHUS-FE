import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import esbuild from 'esbuild';
import { preserveDirectivesPlugin } from 'esbuild-plugin-preserve-directives';
import path from 'path';

const outdir = path.join(process.cwd(), 'dist');
esbuild
  .build({
    bundle: true,
    plugins: [
      vanillaExtractPlugin(),
      preserveDirectivesPlugin({
        directives: ['use client', 'use strict'],
        include: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
      }),
    ],
    format: 'esm',
    loader: { '.css': 'file' },
    outdir,
    external: ['react', 'react-dom'],
    entryPoints: [
      './src/index.ts',
      './src/themes/theme.css.ts',
      './src/styles/global.css.ts',
    ],
    platform: 'browser',
  })
  .catch(() => process.exit(1));
