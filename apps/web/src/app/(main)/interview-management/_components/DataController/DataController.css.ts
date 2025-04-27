import { style } from '@vanilla-extract/css';

export const button = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});