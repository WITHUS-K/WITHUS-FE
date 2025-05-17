import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';
export const tabBar = style({
  display: 'flex',
  width: '100%',
  height: '4.8rem',
});

export const tabButton = recipe({
  base: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: '0.4rem',
    textAlign: 'center',
    height: '100%',
    padding: '1.2rem',
    ...fontStyles.md2_text_semibold,
  },
  variants: {
    state: {
      active: {
        borderBottom: `2px solid ${vars.colors.primary50}`,
        color: vars.colors.primary50,
      },
      inactive: {
        borderBottom: `1px solid ${vars.colors.grayscale10}`,
        color: vars.colors.grayscale10,
      },
    },
  },
  defaultVariants: {
    state: 'inactive',
  },
});

export const indicator = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '1.8rem',
  height: '1.8rem',
  borderRadius: '50%',
  ...fontStyles.xs_caption_medium,
});

export const indicatorActive = style({
  backgroundColor: vars.colors.primary50,
  color: vars.colors.white,
});

export const indicatorInactive = style({
  backgroundColor: vars.colors.grayscale20,
  color: vars.colors.white,
});
