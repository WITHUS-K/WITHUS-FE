import { style, globalStyle } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const navigator = style({
  position: 'fixed',
  top: '8.4rem',
  right: '9rem',
  width: '32rem',

  background: vars.colors.white,
  border: `1px solid ${vars.colors.grayscale5}`,
  borderRadius: '24px',

  overflow: 'hidden',
  zIndex: 100,
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
  gap: '0.8rem',
  display: 'flex',
  flexDirection: 'column',
});
export const item = style({
  width: '100%',
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

export const active = style({
  background: vars.colors.primary5,
});

export const label = style({
  color: vars.colors.grayscale70,
  ...fontStyles.md1_text_semibold,
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

export const focusHighlight = style({
  border: `1px solid transparent`,
  borderRadius: '12px',

  selectors: {
    '&:focus': {
      outline: 'none',
      borderColor: vars.colors.primary50,
    },
  },
});
