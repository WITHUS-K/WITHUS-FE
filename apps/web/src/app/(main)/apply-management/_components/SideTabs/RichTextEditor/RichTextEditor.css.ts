import { styleVariants, style } from '@vanilla-extract/css';
import { fontStyles } from '@repo/theme';
import { vars } from '@repo/theme';
const variableCommon = style({
  borderRadius: '4px',
  padding: '0.15rem 0.4rem',
  display: 'inline-block',
  ...fontStyles.xs_caption_medium,
});

export const variableStyles = styleVariants({
  name: [
    variableCommon,
    {
      backgroundColor: '#DBF6FF',
      color: '#0084BC',
    },
  ],
  position: [
    variableCommon,
    {
      backgroundColor: '#EAEFFF',
      color: '#2C60FF',
    },
  ],
  interviewRoom: [
    variableCommon,
    {
      backgroundColor: '#EDE7F6',
      color: '#5E35B1',
    },
  ],
  interviewDateTime: [
    variableCommon,
    {
      backgroundColor: '#FFEDFE',
      color: '#F25DEB',
    },
  ],
});

export const textarea = style({
  width: '100%',
  height: '24rem',
  resize: 'vertical',
  border: 'none',

  ...fontStyles.sm_caption_medium,
  color: vars.colors.grayscale90,

  '::placeholder': {
    color: vars.colors.grayscale40,
  },

  selectors: {
    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
    },
    // 만약 focus-visible 만 타깃하고 싶으면
    '&:focus-visible': {
      outline: 'none',
      boxShadow: 'none',
    },
  },
});
