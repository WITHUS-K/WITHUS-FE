import { fontStyles, vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const paginationWrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1.2rem',
});

export const listStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.2rem',
  margin: 0,
  padding: 0,
});

export const listItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const pageItemStyle = style({
  cursor: 'pointer',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3.2rem',
  height: '3.2rem',
  textDecoration: 'none',
  padding: '0.2rem 1.1rem',
  borderRadius: '8px',
  color: vars.colors.grayscale30,
  transition: 'background-color 0.2s ease, color 0.2s ease',
  ...fontStyles.md1_text_medium,
  selectors: {
    '&:hover': {
      color: vars.colors.grayscale80,
      backgroundColor: vars.colors.grayscale5,
    },
  },
});

export const pageItemActiveStyle = style({
  color: vars.colors.white,
  backgroundColor: vars.colors.primary50,
});

export const pageItemDisabledStyle = style({
  color: vars.colors.grayscale30,
  cursor: 'not-allowed',
  selectors: {
    '&:hover': {
      backgroundColor: 'transparent',
      color: vars.colors.grayscale30,
    },
  },
});

export const arrowStyle = style({
  cursor: 'pointer',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  color: vars.colors.grayscale30,
  transition: 'background-color 0.2s ease, color 0.2s ease',
  selectors: {
    '&:hover': {
      color: vars.colors.grayscale30,
      backgroundColor: vars.colors.grayscale5,
    },
  },
});

export const arrowDisabledStyle = style({
  color: vars.colors.grayscale10,
  cursor: 'not-allowed',
  selectors: {
    '&:hover': {
      backgroundColor: 'transparent',
      color: vars.colors.grayscale10,
    },
  },
});
