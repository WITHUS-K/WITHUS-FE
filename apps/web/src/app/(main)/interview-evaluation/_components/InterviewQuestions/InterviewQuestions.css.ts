import { style } from '@vanilla-extract/css';
import { fontStyles, vars } from '@repo/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  width: '100%',
  justifyContent: 'center',
  marginBottom: '3.2rem',
});

export const questionRow = style({
  position: 'relative',
});

export const questionWrapper = style({
  width: '100%',
});

export const btn = style({
  display: 'flex',
  alignItems: 'content',
  gap: '0.4rem',
});

export const removeButton = style({
  all: 'unset',
  position: 'absolute',
  right: '15rem',
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
  ...fontStyles.md2_text_semibold,
});

export const listContainer = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.grayscale5,
  borderRadius: '12px',
  padding: '1.6rem',
  gap: '1.6rem',
});

export const editContainer = style({
  width: '100%',
  display: 'flex',
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
  padding: '1.6rem',
  border: `1px solod ${vars.colors.grayscale10}`,
  justifyContent: 'space-between',
});
