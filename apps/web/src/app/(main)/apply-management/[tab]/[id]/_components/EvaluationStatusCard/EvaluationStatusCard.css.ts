import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const card = style({
  border: `1px solid ${vars.colors.grayscale10}`,
  borderRadius: '16px',
  overflow: 'hidden',
  background: vars.colors.bg,
});

export const row = style({
  display: 'flex',
  alignItems: 'center',
  padding: '12px 16px',
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${vars.colors.grayscale10}`,
    },
  },
});

export const stack = style({
  display: 'flex',
  alignSelf: 'center'
});