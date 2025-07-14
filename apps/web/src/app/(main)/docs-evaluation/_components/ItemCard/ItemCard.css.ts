import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const card = style({
  background: vars.colors.white,
  borderRadius: '16px',
  padding: '2rem',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  flex: '0 1 calc((100% - 2rem * 2) / 3)',
});

export const divider = style({
  background: vars.colors.grayscale10,
  width: '100%',
  height: '1px',
  marginTop: '1.6rem',
  marginBottom: '1.6rem',
});
