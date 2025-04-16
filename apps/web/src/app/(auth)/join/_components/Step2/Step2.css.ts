import { style, styleVariants } from '@vanilla-extract/css';
import { fontStyles } from '@repo/theme';
import { vars } from '@repo/theme';

export const containerStyle = style({
  backgroundColor: vars.colors.white,
  borderRadius: '8px',
  padding: '2rem 1.6rem',
  width: '100%',
});
