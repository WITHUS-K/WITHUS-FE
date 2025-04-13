import { styleVariants } from '@vanilla-extract/css';
import { fontStyles } from '@repo/theme';
import { colors } from '@repo/theme';

export const textVariants = styleVariants(fontStyles, (style) => ({
  fontSize: style.fontSize,
  fontWeight: style.fontWeight,
}));

export const textColors = styleVariants(colors, (value) => ({
  color: value,
}));
