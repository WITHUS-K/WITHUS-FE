import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';
export const root = style({
  padding: '1.6rem',
  borderRadius: '12px',
  backgroundColor: vars.colors.grayscale5,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  width: '27.4rem',
  height: '100%',
});

export const list = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  width: '100%',

  maxHeight: '39rem',
  minHeight: '39rem',
  overflowY: 'scroll',
  scrollbarGutter: 'stable',

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

export const listContainer = style({
  backgroundColor: vars.colors.white,
  padding: '0.8rem',
  height: '100%',
  borderRadius: '12px',
});

export const selectedItem = style({
  backgroundColor: vars.colors.primary5,
});
export const selectedText = style({
  color: vars.colors.primary50,
});

export const item = style({
  display: 'flex',
  width: '100%',
  borderRadius: '8px',
  padding: '0.6rem',
  selectors: {
    '&:hover': { backgroundColor: vars.colors.grayscale5 },
  },
  cursor: 'pointer',
});

export const editingItem = style({
  flexDirection: 'column',
  backgroundColor: vars.colors.grayscale5,
  padding: '0.8rem',
  gap: '0.4rem',
  borderRadius: '12px',
});

export const colorBlock = style({
  width: '2rem',
  height: '2rem',
  borderRadius: '3px',

  selectors: {
    [`${item}:hover &`]: {
      outline: `2px solid ${vars.colors.grayscale10}`,
    },
  },
});

export const count = style({
  marginLeft: 'auto',
  color: vars.colors.grayscale40,
});

export const inputWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  width: '100%',

  backgroundColor: vars.colors.grayscale5,
  borderRadius: 12,
  padding: '0.8rem',
});

export const inputContainer = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '3.2rem',
  padding: '0 0.6rem',
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.grayscale10}`,
  borderRadius: 8,
  selectors: {
    '&:focus-within': {
      border: `1px solid ${vars.colors.primary50}`,
    },
  },
});

export const colorIcon = style({
  flexShrink: 0,
  width: '2rem',
  height: '2rem',
  borderRadius: 3,
  cursor: 'pointer',
});

export const inputWithIcon = style({
  flex: 1,
  marginLeft: '0.8rem',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  ...fontStyles.sm_caption_regular,
});

export const paletteContainer = style({
  width: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 4rem)',
  gap: '0.35rem',
  marginTop: '0.4rem',
});

export const paletteColor = style({
  width: '4rem',
  height: '4rem',
  borderRadius: 8,
  cursor: 'pointer',
});
