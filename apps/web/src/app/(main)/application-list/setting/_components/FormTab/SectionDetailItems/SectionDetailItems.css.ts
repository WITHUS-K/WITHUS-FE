import { style } from '@vanilla-extract/css';
import { vars, fontStyles } from '@repo/theme';

export const addButton = style({
  display: 'flex',
  width: '8rem',
  gap: '0.8rem',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  padding: '0.8rem 1rem',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.grayscale5,
    },
  },
});

export const itemWrapper = style({
  background: vars.colors.grayscale5,
  width: '100%',
  paddingBottom: '2rem',
  paddingRight: '2rem',
  paddingLeft: '2rem',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
});

export const headerInputContainer = style({
  background: vars.colors.white,
  borderRadius: '12px',
  padding: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  marginTop: '3.2rem',
});

export const controlsContainer = style({
  display: 'flex',
  width: '100%',
  gap: '4rem',
});

export const dropdownRow = style({
  display: 'flex',
  gap: '0.8rem',
  flexWrap: 'wrap',
});

export const input = style({
  border: 'none',
  outline: 'none',
  width: '100%',
  background: 'transparent',
  color: vars.colors.grayscale90,
  '::placeholder': { color: vars.colors.grayscale40 },
  ...fontStyles.md2_text_regular,

  resize: 'none',
  overflowY: 'hidden',
  boxSizing: 'border-box',

  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  padding: 0,
});

export const dragHandle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '2rem',
  width: '4rem',
  cursor: 'grab',
  userSelect: 'none',
  opacity: 0,
  pointerEvents: 'none',
  transition: 'opacity 120ms ease',

  ':active': { cursor: 'grabbing' },

  // 부모(itemWrapper)를 hover하면 보이도록
  selectors: {
    [`${itemWrapper}:hover &`]: {
      opacity: 1,
      pointerEvents: 'auto',
    },
  },
});
