import { colors } from "./colors";
import { typography } from "./typography";
import { fontStyles } from "./fontStyles";

export const tokens = {
  colors,
  typography,
  fontStyles,
} as const;

export type TokensType = typeof tokens;
