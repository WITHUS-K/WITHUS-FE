import { recipe } from '@vanilla-extract/recipes';
import { colors, fontStyles } from '@repo/theme';

const bgVariants = Object.fromEntries(
  Object.entries(colors).map(([key, value]) => [
    key,
    { backgroundColor: value },
  ])
);

const colorVariants = Object.fromEntries(
  Object.entries(colors).map(([key, value]) => [key, { color: value }])
);

export const chip = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    padding: '0.3rem 1rem',
    whiteSpace: 'nowrap',
    ...fontStyles.xs_caption_medium,
  },
  variants: {
    bg: bgVariants,
    color: colorVariants,
  },
  defaultVariants: {
    bg: 'grayscale5',
    color: 'grayscale90',
  },
});
