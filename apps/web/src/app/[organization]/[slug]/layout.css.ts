import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const layoutStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100vw',
  overflowX: 'hidden',

  justifyContent: 'center',
  alignItems: 'center',

  // 세로 스크롤 허용
  //overflowY: 'auto',
  // IE/Edge 스크롤바 숨김
  msOverflowStyle: 'none',
  // Firefox 스크롤바 숨김
  scrollbarWidth: 'none',
  // WebKit(Blink) 스크롤바 숨김
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const containerStyle = style({
  // header(60px)를 제외한 영역 전체를 차지
  //flex: 1,
  paddingTop: '2.4rem',
  paddingLeft: '9rem',
  paddingRight: '2.4rem',
  height: 'calc(100vh - 60px)',
});

export const mobileContainerStyle = style({
  paddingTop: '2.4rem',
  height: 'calc(100vh - 60px)',
})

export const headerStyle = style({
  position: 'fixed',
  borderBottom: `1px solid ${vars.colors.grayscale10}`,
  top: 0,
  left: 0,
  right: 0,
  height: '60px',
  backgroundColor: vars.colors.white,
  zIndex: 10,
});
