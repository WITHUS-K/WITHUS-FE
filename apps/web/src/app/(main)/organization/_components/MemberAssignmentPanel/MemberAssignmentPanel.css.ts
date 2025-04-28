import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  padding: '1.6rem',
  backgroundColor: vars.colors.grayscale5,
  borderRadius: '12px',
  width: '100%',
  height: '57.6rem',
});

export const panels = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '1.5rem',
});

export const panel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  padding: '1.2rem',
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
  height: '100%',
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  maxHeight: '34.4rem',
  minHeight: '34.4rem',
  overflowY: 'auto',

  scrollbarGutter: 'stable',
  selectors: {
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: vars.colors.grayscale20,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
  },
});

export const item = style({
  padding: '0.8rem 0.6rem',
  borderRadius: '6px',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.grayscale5,
    },
  },
});

export const selectedItem = style({
  backgroundColor: vars.colors.primary5,
});

export const highlight = style({
  backgroundColor: vars.colors.primary50,
  color: vars.colors.white,
  borderRadius: 2,
  padding: '0 2px',
});
