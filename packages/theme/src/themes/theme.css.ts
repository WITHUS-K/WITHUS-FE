import { createTheme } from '@vanilla-extract/css';
import { tokens } from '../tokens/tokens';
import type { ThemeContract } from './contract';

export const [themeClass, vars] = createTheme<ThemeContract>({
  colors: tokens.colors,
  borderRadius: tokens.radius,
  typography: {
    fontSize: tokens.typography.fontSize,
    fontWeight: tokens.typography.fontWeight,
  },
});
