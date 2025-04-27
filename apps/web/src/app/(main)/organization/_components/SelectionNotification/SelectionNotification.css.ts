import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const root = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.8rem 2rem',
  border: `1px solid ${vars.colors.primary20}`,
  borderRadius: '12px',
  backgroundColor: vars.colors.white,
});
