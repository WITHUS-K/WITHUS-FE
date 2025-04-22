import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const arrow = style({
  color: vars.colors.grayscale90,
});

export const arrowDisabled = style({
  color: vars.colors.grayscale30,
  cursor: 'default',
});
