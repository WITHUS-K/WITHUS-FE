import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const item = style({
  display: 'flex',
  alignItems: 'center',

  borderRadius: '8px',
  padding: '0.45rem 0.6rem',
  width: '100%',
  backgroundColor: vars.colors.white,
});

export const selected = style({
  backgroundColor: vars.colors.primary5,
});

export const tagContainer = style({
  display: 'flex',
  flexWrap: 'nowrap',
  maxWidth: '40rem',
  overflowX: 'auto',
  gap: '0.8rem',
  scrollbarWidth: 'none', // Firefox: 스크롤바 숨기기

  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none', // ✅ Chrome/Safari: 스크롤바 숨기기
    },
  },
});
