import { style, styleVariants } from '@vanilla-extract/css';
import { vars, fontStyles, colors } from '@repo/theme';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  //width: '100%',
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

export const successTextStyle = style({
  color: vars.colors.success,
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
      search: { padding: '0.8rem 1.2rem', borderRadius: '8px', height: '4rem' },
      club: { padding: '1.6rem', borderRadius: '12px' },
      auth: { padding: '1.6rem 2rem', borderRadius: '12px', height: '5.6rem' },
    },
  },
  defaultVariants: {
    state: 'default',
    size: 'auth',
  },
});

export const baseInputStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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

export const iconStyleVariants = recipe({
  base: {
    position: 'absolute',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
  },
  variants: {
    size: {
      search: { right: '1.2rem' },
      club: { right: '1.6rem' },
      auth: { right: '2rem' },
    },
  },
  defaultVariants: {
    size: 'auth',
  },
});

export const commentInputWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  alignItems: 'flex-start',
  padding: '1.6rem',
  border: `1px solid ${vars.colors.grayscale20}`,
  borderRadius: '16px',
  width: '100%',
});

export const questionTitleInput = style({
  all: 'unset',
  width: '100%',
  height: 'auto',
})

export const commentInput = style({
  all: 'unset',
  width: '100%',
  height: 'auto',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
  color: vars.colors.grayscale90,
  selectors: {
    '&::placeholder': {
      color: vars.colors.grayscale40,
    },
  },
  ...fontStyles.md2_text_regular
});

export const commentDivider = style({
  width: '100%',
  borderTop: `1px dashed ${colors.grayscale10}`
})

export const commentButton = style({
  width: 'auto',
  flex: '0 0 auto',
})