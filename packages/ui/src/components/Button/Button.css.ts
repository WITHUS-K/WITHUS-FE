import { recipe, type RecipeVariants } from '@vanilla-extract/recipes';
import { styleVariants } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import type { ButtonSize } from './Button';
import type { textVariants } from '../Text/Text.css';
import { colors } from '@repo/theme';

const buttonSize = {
  '32': { height: '3.2rem' },
  '40': { height: '4rem' },
  '48': { height: '4.8rem' },
  '56': { height: '5.6rem' },
  '64': { height: '6.4rem' },
} as const;

export const buttonVariants = styleVariants({
  main: {
    backgroundColor: vars.colors.primary50,
    color: colors.white,
    selectors: {
      '&:hover': { backgroundColor: vars.colors.primary60 },
      '&:active': { backgroundColor: vars.colors.primary70 },
      '&:disabled': {
        backgroundColor: vars.colors.grayscale30,
        color: vars.colors.grayscale10,
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
      '&:disabled': {
        border: `1px solid ${vars.colors.grayscale10}`,
        color: vars.colors.grayscale10,
      },
    },
  },
});

export const buttonStyle = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  },
  variants: {
    size: buttonSize,
    variant: buttonVariants,
    isPressed: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    //main
    {
      variants: { variant: 'main', isPressed: true },
      style: {
        backgroundColor: vars.colors.primary70,
        color: colors.white,
      },
    },
    {
      variants: { variant: 'main', isPressed: false },
      style: {
        backgroundColor: vars.colors.grayscale30,
        color: vars.colors.grayscale10,
        selectors: {
          '&:hover': { color: colors.white },
          '&:active': { color: colors.white },
        },
      },
    },

    // sub
    {
      variants: { variant: 'sub', isPressed: true },
      style: {
        backgroundColor: vars.colors.primary20,
        color: vars.colors.primary50,
      },
    },
    {
      variants: { variant: 'sub', isPressed: false },
      style: {
        backgroundColor: vars.colors.grayscale5,
        color: vars.colors.grayscale20,
        selectors: {
          '&:hover': { color: vars.colors.primary50 },
          '&:active': { color: vars.colors.primary50 },
        },
      },
    },

    // basic
    {
      variants: { variant: 'basic', isPressed: true },
      style: {
        backgroundColor: vars.colors.grayscale30,
        color: vars.colors.grayscale60,
      },
    },
    {
      variants: { variant: 'basic', isPressed: false },
      style: {
        backgroundColor: vars.colors.grayscale10,
        color: vars.colors.white,
        selectors: {
          '&:hover': { color: vars.colors.grayscale60 },
          '&:active': { color: vars.colors.grayscale60 },
        },
      },
    },

    // stroke
    {
      variants: { variant: 'stroke', isPressed: true },
      style: {
        border: `2px solid ${vars.colors.primary50}`,
        color: vars.colors.primary50,
      },
    },
    {
      variants: { variant: 'stroke', isPressed: false },
      style: {
        border: `1px solid ${vars.colors.primary20}`,
        color: vars.colors.primary20,
        selectors: {
          '&:hover': { color: vars.colors.primary50 },
          '&:active': { color: vars.colors.primary50 },
        },
      },
    },

    // white
    {
      variants: { variant: 'white', isPressed: true },
      style: {
        backgroundColor: vars.colors.grayscale20,
        color: vars.colors.grayscale50,
      },
    },
    {
      variants: { variant: 'white', isPressed: false },
      style: {
        border: `1px solid ${vars.colors.grayscale10}`,
        color: vars.colors.grayscale10,
        selectors: {
          '&:hover': { color: vars.colors.grayscale50 },
          '&:active': { color: vars.colors.grayscale50 },
        },
      },
    },
  ] as const,
});

export type ButtonRecipeVariants = RecipeVariants<typeof buttonStyle>;

const commonIconStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const iconSizeStyle = styleVariants({
  '32': {
    ...commonIconStyle,
    fontSize: '1.6rem',
  },
  '40': {
    ...commonIconStyle,
    fontSize: '1.6rem',
  },
  '48': {
    ...commonIconStyle,
    fontSize: '2.4rem',
  },
  '56': {
    ...commonIconStyle,
    fontSize: '2.4rem',
  },
  '64': {
    ...commonIconStyle,
    fontSize: '2.4rem',
  },
});

export const textVariantMap: Record<ButtonSize, keyof typeof textVariants> = {
  '32': 'sm_caption_medium',
  '40': 'md2_text_medium',
  '48': 'md2_text_medium',
  '56': 'md2_text_medium',
  '64': 'lg_subtitle_medium',
};
