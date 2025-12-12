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

export const sectionText = style({
  display: 'flex',
  marginBottom: '1rem',
  alignItems: 'center',
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
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.4rem',
  height: '2.4rem',
  padding: 0,
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  color: vars.colors.grayscale50,
  transition: 'color 0.15s ease, transform 0.15s ease',

  selectors: {
    '&:hover': {
      color: vars.colors.grayscale70,
      transform: 'scale(1.05)', 
    },
  },
});
export const activeIcon = style({ color: vars.colors.grayscale90 }); // 토글된 버튼 색상

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
    '&:focus-visible': {
      outline: 'none',
      boxShadow: 'none',
    },
  },
});

const variableCommon = style({
  borderRadius: '4px',
  padding: '0.15rem 0.4rem',
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

export const emptyRecipients = style({
  width: '100%',
  textAlign: 'left',
  padding: '0.7rem 0',
  color: vars.colors.grayscale20,
  borderBottom: `1px solid ${vars.colors.grayscale20}`,
  cursor: 'pointer',
  ...fontStyles.sm_caption_medium
});

export const addMoreBtn = style({
  height: '2.4rem',
  padding: '0 0.8rem',
  borderRadius: '999px',
  border: `1px solid ${vars.colors.grayscale20}`,
  color: vars.colors.grayscale60,
  background: 'transparent',
  cursor: 'pointer',
});