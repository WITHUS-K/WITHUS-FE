import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const root = style({
  position: 'fixed',
  top: '8.4rem',
  right: '2.4rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.8rem 2rem',
  border: `1px solid ${vars.colors.grayscale40}`,
  borderRadius: '12px',
  backgroundColor: vars.colors.grayscale70,
});

export const icon = style({
  color: vars.colors.white,
  height: '2.4rem',
});
