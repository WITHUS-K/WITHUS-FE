import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.5rem 0',
  borderBottom: `1px solid #EAEAEA`,
});

export const profile = style({
  flex: 1,
  textAlign: 'center',
});

export const controlButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});