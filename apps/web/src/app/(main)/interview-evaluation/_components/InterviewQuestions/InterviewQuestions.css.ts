import { style } from '@vanilla-extract/css';
import { fontStyles, vars } from '@repo/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  width: '100%',
  justifyContent: 'center',
  marginBottom: '3.2rem'
});

export const questionRow = style({
  position: 'relative',
});

export const questionWrapper = style({
  width: '100%',
});

export const removeButton = style({
  all: 'unset',
  position: 'absolute',
  right: '1.5rem',
  top: '54%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
});

export const addButton = style({
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.8rem',
  cursor: 'pointer',
  color: vars.colors.grayscale30,
  alignSelf: 'center',
  selectors: {
    '&:hover': {
      color: vars.colors.grayscale50,
    },
  },
  ...fontStyles.md2_text_semibold
});