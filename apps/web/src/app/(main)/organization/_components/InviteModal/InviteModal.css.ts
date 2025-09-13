import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const item = style({
  backgroundColor: vars.colors.white,
  borderRadius: '8px',
  padding: '0.4rem 0.8rem',
  selectors: {
    '&:hover': { backgroundColor: vars.colors.grayscale5 },
  },
});

export const listContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  width: '100%',
  height: '32.2rem',
  maxHeight: '32.2rem',
  overflowY: 'scroll',

  selectors: {
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: vars.colors.grayscale10,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
  },
});

export const button = style({
  color: vars.colors.grayscale20,
  selectors: {
    [`${item}:hover &`]: {
      color: vars.colors.grayscale50,
    },
  },
});
