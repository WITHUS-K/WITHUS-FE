import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const button = style({
  display: 'flex',
  alignItems: 'center',
  padding: '0.95rem 1rem',
  borderRadius: '8px',
  gap: '0.4rem',
  backgroundColor: vars.colors.grayscale5,
  border: `1px solid ${vars.colors.grayscale10}`,
  cursor: 'pointer',
  color: vars.colors.grayscale80,
});
