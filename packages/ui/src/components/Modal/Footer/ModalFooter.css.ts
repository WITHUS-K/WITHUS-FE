import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const footerWrapper = style({
  maxHeight: '8.4rem',
  position: 'relative',
});

export const footer = styleVariants({
  hasBorder: {
    borderTop: `1px solid ${vars.colors.grayscale10}`,
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    zIndex: 2,
    position: 'sticky',
    bottom: 0,
    padding: '1.6rem 2rem',
  },
  false: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    paddingBottom: '2rem',
    paddingInline: '2rem',
  },
});
