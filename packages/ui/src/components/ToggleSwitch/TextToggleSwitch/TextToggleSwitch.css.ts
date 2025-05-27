import { colors, fontStyles } from '@repo/theme';
import { style, styleVariants } from '@vanilla-extract/css';

export const wrapper = styleVariants({
  base: {
    padding: '0.3rem',
    display: 'inline-block',

  },
  full: {
    padding: '0.3rem',
    display: 'inline-block',
    width: '100%',
  },
});


export const container = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '14px',
  backgroundColor: colors.grayscale5,
  padding: '0.3rem',
  width: '100%',
  vars: {
    '--segment-width': '120px',
  },
});

export const highlight = style({
  position: 'absolute',
  width: 'var(--segment-width)',     
  height: '4rem',
  backgroundColor: colors.white,
  borderRadius: '12px',
  transition: 'transform 0.3s ease',
  zIndex: 0,
});

export const segment = style({
  position: 'relative',
  zIndex: 1,
  width: 'var(--segment-width)',     
  height: '4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'color 0.3s ease',
});

export const variants = styleVariants({
  selected: {
    color: colors.primary50,
    ...fontStyles.md2_text_semibold,
  },
  unselected: {
    color: colors.grayscale30,
    ...fontStyles.md2_text_medium,
  },
});