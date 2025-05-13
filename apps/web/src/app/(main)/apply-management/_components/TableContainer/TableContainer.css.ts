import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const pagination = style({
  position: 'fixed',
  bottom: '0',
  right: '0',
  left: '240px', // 사이드바 너비에 맞춰
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '4.4rem',
  backgroundColor: vars.colors.white,
  borderTop: `1px solid ${vars.colors.grayscale10}`,
});
