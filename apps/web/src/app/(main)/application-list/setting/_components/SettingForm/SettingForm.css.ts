import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const scrollArea = style({
  flex: 1,
  width: '100%',
  overflowY: 'auto',
  scrollbarWidth: 'none', // Firefox
  msOverflowStyle: 'none', // IE 10+
  selectors: {
    '&::-webkit-scrollbar': {
      // Chrome, Safari
      display: 'none',
    },
  },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '2.4rem',
  gap: '2.4rem',
  height: 'calc(100vh - 60px)',
  width: '100%',
});
