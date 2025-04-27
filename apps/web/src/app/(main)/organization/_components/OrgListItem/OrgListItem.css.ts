import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const item = style({
  display: 'flex',
  alignItems: 'center',
  height: '4.8rem',
  borderRadius: '8px',
  paddingInline: '0.6rem',
  width: '100%',
  backgroundColor: vars.colors.white,
});

export const selected = style({
  backgroundColor: vars.colors.primary10,
});
