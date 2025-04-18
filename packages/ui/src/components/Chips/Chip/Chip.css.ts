import { style, styleVariants } from '@vanilla-extract/css';
import { colors, fontStyles } from '@repo/theme';

export const chipBase = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.3rem 1rem',   
  borderRadius: '6px',       
  ...fontStyles.xs_caption_medium
});

export const chipBackgrounds = styleVariants(colors, (value) => ({
  backgroundColor: value,
}));

export const chipTextColors = styleVariants(colors, (value) => ({
  color: value,
}));