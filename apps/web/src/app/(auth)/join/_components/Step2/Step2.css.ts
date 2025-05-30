import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const containerStyle = style({
  backgroundColor: vars.colors.white,
  borderRadius: '8px',
  padding: '2rem 1.6rem',
  width: '100%',
});

export const listStyle = style({
  backgroundColor: 'none',
  borderRadius: '8px',
  padding: '2rem 1.6rem',
  width: '100%',
  cursor: 'pointer',
});
