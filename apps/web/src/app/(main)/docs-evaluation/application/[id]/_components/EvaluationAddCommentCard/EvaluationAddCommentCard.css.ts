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
  padding: '3.2rem',
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
});
