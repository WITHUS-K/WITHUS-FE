import { style, styleVariants } from '@vanilla-extract/css';
import { tagColorMap, TagColor } from '@repo/utils';
import { fontStyles } from '@repo/theme';

export const tagBase = style({
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  gap: '0.6rem',

  ...fontStyles.xs_caption_medium,
});

export const tagVariants = styleVariants({
  withCircle: {
    padding: '0.4rem 0.8rem',
    borderRadius: 16,
  },
  noCircle: {
    padding: '0.6rem 0.8rem',
    borderRadius: 8,
  },
});

export const tagColorVariants = styleVariants(
  tagColorMap,
  ({ background }, color) => ({
    backgroundColor: background,
    color: color as TagColor,
  })
);

export const dotBase = style({
  width: 8,
  height: 8,
  borderRadius: '50%',
});

export const dotColorVariants = styleVariants(tagColorMap, ({ circle }) => ({
  backgroundColor: circle,
}));

export const hideDot = style({ display: 'none' });
