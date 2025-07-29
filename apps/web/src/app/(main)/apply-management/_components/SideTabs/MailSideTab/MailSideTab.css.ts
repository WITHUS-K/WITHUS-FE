// components/SideTabs/MailSideTab.css.ts
import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const section = style({
  display: 'flex',
  marginBottom: '1rem',
  alignItems: 'center',
  maxHeight: '24rem',
  overflowY: 'scroll',
});

export const tags = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.6rem',
  width: '100%',
  paddingBottom: '0.7rem',
  borderBottom: `1px solid ${vars.colors.grayscale10}`,
});

export const tag = style({
  padding: '0rem 0.8rem',
  borderRadius: '11px',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  ...fontStyles.sm_caption_medium,
  color: vars.colors.grayscale70,
  border: `1px solid ${vars.colors.grayscale10}`,
});

export const fileInputWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '5rem',
  width: '100%',
  padding: '0.8rem',
  border: `1px solid ${vars.colors.grayscale10}`,
  borderRadius: '12px',
});

export const hiddenInput = style({
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  border: 0,
  padding: 0,
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
});

export const input = style({
  width: '100%',
  height: '3.5rem',
  border: 'none',
  borderBottom: `1px solid ${vars.colors.grayscale10}`,
  ...fontStyles.sm_caption_medium,
  color: vars.colors.grayscale90,

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

export const fileInput = style({
  width: '100%',
  border: `1px solid ${vars.colors.grayscale10}`,
  borderRadius: '12px',
  padding: '0.8rem',
  cursor: 'pointer',
});

export const iconBtn = style({
  all: 'unset',
  cursor: 'pointer',
  height: '2.4rem',
});
export const activeIcon = style({ color: vars.colors.grayscale70 }); // 토글된 버튼 색상

export const textarea = style({
  width: '100%',
  maxHeight: '24rem',
  resize: 'vertical',
  border: 'none',
  overflowY: 'scroll',

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

const variableCommon = style({
  borderRadius: '4px',
  padding: '0.15rem 0.4rem',
  //display: 'inline-block',
  ...fontStyles.xs_caption_medium,
  cursor: 'pointer',
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
