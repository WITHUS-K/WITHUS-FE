import { colors } from "./colors";
import { typography } from "./typography";
import { fontStyles } from "./fontStyles";
import { radius } from "./radius";
import { spacing } from "./spacing";

export const tokens = {
  colors,
  typography,
  fontStyles,
  spacing,
  radius,
} as const;

export type TokensType = typeof tokens;
