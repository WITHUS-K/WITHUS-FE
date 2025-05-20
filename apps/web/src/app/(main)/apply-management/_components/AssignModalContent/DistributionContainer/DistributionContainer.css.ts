import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const containerStyle = style({
  borderRadius: '16px',
  border: `1px solid ${vars.colors.grayscale10}`,
  marginBottom: '4rem',
});

export const headerStyle = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  backgroundColor: vars.colors.grayscale5,
  borderBottom: `1px solid ${vars.colors.grayscale10}`,
  padding: '0.95rem 1.2rem',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
});
