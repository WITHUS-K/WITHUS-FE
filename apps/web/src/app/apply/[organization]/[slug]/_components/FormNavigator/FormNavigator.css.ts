import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const navigator = style({
  position: 'sticky',
  top: '8rem',
  alignSelf: 'flex-start',
  maxWidth: '32rem',
  maxHeight: 'calc(100vh - 10rem)', // 안전한 높이

  background: vars.colors.white,
  border: `1px solid ${vars.colors.grayscale5}`,
  borderRadius: '24px',
  overflow: 'hidden',
});

export const space = style({
  minWidth: '2rem',
  maxWidth: '7rem',
});

export const scrollArea = style({
  maxHeight: '60rem',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',

  selectors: {
    '&::-webkit-scrollbar': {
      width: '1px',
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

export const contentWrapper = style({
  // 실제 내부 여백은 여기서
  padding: '2.8rem',
  width: '100%',
  gap: '0.8rem',
  display: 'flex',
  flexDirection: 'column',
});

export const item = style({
  width: '100%',
  //width : '26.4rem',
  gap: '2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.4rem 0.8rem',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background 0.2s',
  selectors: {
    '&:hover': {
      background: vars.colors.grayscale5,
    },
  },
});

export const required = style({
  color: vars.colors.error,
});

export const labelWrapper = style({
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  gap: '0.4rem',
});

export const active = style({
  background: vars.colors.primary5,
});

export const label = style({
  ...fontStyles.md1_text_semibold,
  color: vars.colors.grayscale70,

  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '18rem',

  selectors: {
    [`${active} &`]: {
      color: vars.colors.primary50,
    },
  },
});

export const divider = style({
  backgroundColor: vars.colors.grayscale5,
  height: '1px',
  width: '100%',
  marginTop: '1.6rem',
  marginBottom: '1.6rem',
});

export const focusableWrapper = style({
  scrollMarginTop: '100px',
});


const focusShadow = keyframes({
  '0%, 100%': {
    boxShadow: 'none',
  },
  '50%': {
    backgroundColor: vars.colors.primary5,
    boxShadow: `0 0 0 0.4rem ${vars.colors.primary5}`,
  },
});

export const flash = style({
  borderRadius: '12px',
  animation: `${focusShadow} 1s ease-in-out forwards`,
});

export const focusHighlight = style({
  border: `1px solid transparent`,
  borderRadius: '12px',
});
