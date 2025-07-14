import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles, colors } from '@repo/theme';

export const container = style({
  borderRadius: '8px',
  backgroundColor: vars.colors.grayscale5,
  width: '16.4rem',
  padding: '0.2rem',
});

export const button = style({
  width: '3.6rem',
  height: '3.6rem',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.grayscale20,
    },
    '&:active': {
      backgroundColor: vars.colors.grayscale10,
    },
  },
});

export const value = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  color: vars.colors.grayscale90,
  width: '8.4rem',
  height: '3.6rem',
  marginInline: '0.2rem',
  backgroundColor: vars.colors.white,
  ...fontStyles.md2_text_medium,
  border: 'none',             
  outline: 'none',             
  boxShadow: 'none',           
  appearance: 'none',  
});
