import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const container = style({
  paddingLeft: '2rem',
  paddingRight: '2rem',
  overflowY: 'scroll',
  maxHeight: '45.1rem',
  scrollbarGutter: 'stable',
  //스크롤바 커스텀
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
