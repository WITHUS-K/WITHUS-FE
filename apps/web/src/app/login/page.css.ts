import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '3.6rem',
});
