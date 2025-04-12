import { createTheme } from '@vanilla-extract/css';
import { tokens } from '..';
import type { ThemeContract } from './contract';

export const [themeClass, vars] = createTheme<ThemeContract>({
  colors: tokens.colors,
  space: tokens.spacing,
  borderRadius: tokens.radius,
  typography: {
    fontSize: tokens.typography.fontSize,
    fontWeight: tokens.typography.fontWeight,
  },
});
