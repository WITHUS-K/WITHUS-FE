import { colors } from './colors';
import { typography } from './typography';
import { fontStyles } from './fontStyles';
import { radius } from './radius';

export const tokens = {
  colors,
  typography,
  fontStyles,
  radius,
} as const;

export type TokensType = typeof tokens;
