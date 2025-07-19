import { style } from '@vanilla-extract/css';

export const container = style({
  overflowY: 'auto',
  scrollbarWidth: 'none', // Firefox: 스크롤바 숨기기

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none', // ✅ Chrome/Safari: 스크롤바 숨기기
    },
  },
});
