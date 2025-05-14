import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const pagination = style({
  position: 'fixed',
  bottom: '0',
  right: '0',
  left: '240px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '4.4rem',
  backgroundColor: vars.colors.white,
  borderTop: `1px solid ${vars.colors.grayscale10}`,
});
