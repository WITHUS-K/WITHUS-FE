import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  padding: '2.4rem',
  borderRadius: '16px',
  backgroundColor: vars.colors.white,
  flexDirection: 'column',
  display: 'flex',
  gap: '2.8rem',
  width: '100%',
});
