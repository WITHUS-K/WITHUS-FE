import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const item = style({
  borderBottom: `1px solid ${vars.colors.grayscale10}`,
});

export const listContainer = style({
  display: 'flex',
  flexDirection: 'column',
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
