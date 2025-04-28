import { style } from '@vanilla-extract/css';
import { fontStyles, vars } from '@repo/theme';

export const headerButton = style({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  gap: '0.9rem',
  cursor: 'pointer',
  textAlign: 'left',
});


export const title = style({
  fontSize: '1.6rem',
  lineHeight: 1.5,
  color: vars.colors.grayscale90,
});

export const listRightSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.9rem',
});

export const toggleButton = style({
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
});

export const arrowIcon = style({
  transition: 'transform 0.2s ease',
  selectors: {
    [`${headerButton}[aria-expanded="true"] &`]: {
      transform: 'rotate(180deg)',
    },
  },
});

export const contentWrapper = style({
  backgroundColor: vars.colors.white,
  color: vars.colors.grayscale90,
  ...fontStyles.md2_text_regular,
});