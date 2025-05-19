import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const container = style({
  //width: '42rem',
  //padding: '2rem',
  backgroundColor: vars.colors.white,
  display: 'flex',
  flexDirection: 'column',
  border: '12px',
});
