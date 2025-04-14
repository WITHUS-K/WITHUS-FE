// components/Button/Button.css.ts
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { styleVariants } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import type { ButtonSize } from './Button';
import type { textVariants } from '../Text/Text.css';
import { colors } from '@repo/theme';

export const buttonStyle = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  variants: {
    size: {
      '32': { height: '3.2rem' },
      '40': { height: '4rem' },
      '48': { height: '4.8rem' },
      '56': { height: '5.6rem' },
      '64': { height: '6.4rem' },
    },
    variant: {
      main: {
        backgroundColor: colors.primary50,
        color: colors.white,
        selectors: {
          '&:hover': { backgroundColor: colors.primary60 },
          '&:active': { backgroundColor: colors.primary70 },
          '&:disabled': {
            backgroundColor: colors.grayscale30,
            color: colors.grayscale10,
          },
        },
      },
      sub: {
        backgroundColor: vars.colors.primary5,
        color: vars.colors.primary50,
        selectors: {
          '&:hover': { backgroundColor: vars.colors.primary10 },
          '&:active': { backgroundColor: vars.colors.primary20 },
          '&:disabled': {
            backgroundColor: vars.colors.grayscale5,
            color: vars.colors.grayscale20,
          },
        },
      },
      basic: {
        backgroundColor: vars.colors.grayscale10,
        color: vars.colors.grayscale60,
        selectors: {
          '&:hover': { backgroundColor: vars.colors.grayscale20 },
          '&:active': { backgroundColor: vars.colors.grayscale30 },
          '&:disabled': {
            backgroundColor: vars.colors.grayscale10,
            color: vars.colors.white,
          },
        },
      },
      stroke: {
        border: `1px solid ${vars.colors.primary50}`,
        backgroundColor: vars.colors.white,
        color: vars.colors.primary50,
        selectors: {
          '&:hover': { border: `2px solid ${vars.colors.primary50}` },
          '&:disabled': {
            border: `1px solid ${vars.colors.primary20}`,
            color: vars.colors.primary20,
          },
        },
      },
      white: {
        backgroundColor: vars.colors.white,
        color: vars.colors.grayscale50,
        border: `1px solid ${vars.colors.grayscale20}`,
        selectors: {
          '&:hover': { backgroundColor: vars.colors.grayscale20 },
        },
      },
    },
  },
});

export type ButtonRecipeVariants = RecipeVariants<typeof buttonStyle>;

export const iconSizeStyle = styleVariants({
  '32': {
    fontSize: '1.6rem', // ✅ 핵심: svg가 em 기준으로 커짐
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '40': {
    fontSize: '1.6rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '48': {
    fontSize: '2.4rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '56': {
    fontSize: '2.4rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '64': {
    fontSize: '2.4rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const textVariantMap: Record<ButtonSize, keyof typeof textVariants> = {
  '32': 'sm_caption_medium',
  '40': 'md2_text_medium',
  '48': 'md2_text_medium',
  '56': 'md2_text_medium',
  '64': 'lg_subtitle_medium',
};
