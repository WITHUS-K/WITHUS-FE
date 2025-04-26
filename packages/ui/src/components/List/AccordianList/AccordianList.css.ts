import { style, styleVariants } from '@vanilla-extract/css';
import { fontStyles, vars } from '@repo/theme';

export const headerButton = style({
  all: 'unset',
  flex: 1,
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

export const arrowStyle = styleVariants({
  open: {
    transform: 'rotate(180deg)',
    transition: 'transform 0.2s ease',
  },
  closed: {
    transform: 'rotate(0deg)',
    transition: 'transform 0.2s ease',
  },
});

export const contentWrapper = style({
  backgroundColor: vars.colors.white,
  color: vars.colors.grayscale90,
  ...fontStyles.md2_text_regular,
});