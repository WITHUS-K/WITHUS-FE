import { colors, fontStyles } from '@repo/theme';
import { style, styleVariants } from '@vanilla-extract/css';

export const wrapper = style({
  padding: '0.3rem',
  display: 'inline-block',
});

export const container = style({
  position: 'relative',      
  display: 'inline-flex',
  alignItems: 'center',
  borderRadius: '14px',
  backgroundColor: '#F5F5F6',
  padding: '0.3rem',
});

export const highlight = style({
  position: 'absolute',
  width: `12rem`,
  height: '4rem',            
  backgroundColor: colors.white,
  borderRadius: '12px',
  transition: 'transform 0.3s ease',
  zIndex: 0,
});

export const segment = style({
  position: 'relative',     
  zIndex: 1,
  width: `12rem`,
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