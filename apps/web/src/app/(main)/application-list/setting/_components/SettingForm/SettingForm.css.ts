import { style } from '@vanilla-extract/css';

export const scrollArea = style({
  flex: 1,
  width: '100%',
  overflowY: 'auto',
  scrollBehavior: 'smooth',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  paddingTop: '2.4rem',
  paddingInline: '2.4rem',
  height: 'calc(100vh - 60px)',
  width: '100%',
});
