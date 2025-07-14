import { fontStyles, vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

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

export const container = style({
  width: '37.1rem',
  paddingTop: '3.2rem',
  paddingBottom: '3.2rem',
  borderRadius: '24px',
  border: `1px solid ${vars.colors.grayscale5}`,
  background: vars.colors.grayscale5,
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  alignContent: 'start',
});

export const titleWrap = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  alignSelf: 'stretch',
  paddingInline: '3.2rem',
});

export const scroll = style({
  width: '100%',
  maxHeight: '90rem',
  overflowY: 'auto',

  selectors: {
    '&::-webkit-scrollbar': {
      width: '2px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: vars.colors.grayscale20,
      borderRadius: '2px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
  },
});
