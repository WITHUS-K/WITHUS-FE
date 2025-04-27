import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const container = style({
  position: 'fixed',
  top: 40,
  padding: '0.7rem 1.2rem',
  borderRadius: '12px',
  backgroundColor: vars.colors.white,
  color: vars.colors.primary50,

  border: `1px solid ${vars.colors.primary20}`,
});

export const content = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});
