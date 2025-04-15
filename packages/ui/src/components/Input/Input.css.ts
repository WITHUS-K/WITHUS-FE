import { style, styleVariants } from '@vanilla-extract/css';
import { vars, fontStyles } from '@repo/theme';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const titleStyle = style({
  color: vars.colors.grayscale80,
});

export const descriptionStyle = style({
  color: vars.colors.grayscale50,
});

export const errorTextStyle = style({
  color: vars.colors.error,
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  ...fontStyles.sm_caption_regular,
});

export const inputWrapper = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px solid ${vars.colors.grayscale20}`,
    backgroundColor: vars.colors.white,
    position: 'relative',

    selectors: {
      '&:focus-within': {
        border: `1px solid ${vars.colors.primary50}`,
      },
    },
  },

  variants: {
    state: {
      default: {},
      success: { border: `1px solid ${vars.colors.success}` },
      error: { border: `1px solid ${vars.colors.error}` },
    },
    size: {
      search: { padding: '0.8rem 1.2rem', borderRadius: '8px' },
      club: { padding: '1.6rem', borderRadius: '12px' },
      auth: { padding: '1.6rem 2rem', borderRadius: '12px' },
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'auth',
  },
});

export const baseInputStyle = {
  flex: 1,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: vars.colors.grayscale80,
  '::placeholder': {
    color: vars.colors.grayscale40,
  },
};

export const inputStyleVariants = styleVariants({
  search: {
    ...baseInputStyle,
    ...fontStyles.sm_caption_regular,
  },
  club: {
    ...baseInputStyle,
    ...fontStyles.md2_text_regular,
  },
  auth: {
    ...baseInputStyle,
    ...fontStyles.md2_text_regular,
  },
});

export const iconBaseStyle = style({
  position: 'absolute',
  cursor: 'pointer',
});

export const iconStyleVariants = styleVariants({
  search: { right: '1.2rem' },
  club: { right: '1.6rem' },
  auth: { right: '2rem' },
});
