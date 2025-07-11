import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  backgroundColor: vars.colors.bg,
  display: 'flex',
  gap: '4rem',
  flexDirection: 'column',
  padding: '2.4rem',
});

export const rightSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
});
