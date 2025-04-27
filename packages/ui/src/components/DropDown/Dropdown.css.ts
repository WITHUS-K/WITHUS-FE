import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const dropdownRootStyle = style({
  position: 'relative',
  display: 'inline-block',
});

export const triggerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `1px solid ${vars.colors.grayscale20}`,
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
  cursor: 'pointer',
  padding: '1.6rem 2rem',
  height: '5.6rem',
  width: '19.7rem',
  boxSizing: 'border-box',
});

export const clubTriggerStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  cursor: 'pointer',
  boxSizing: 'border-box',
});

export const scoreTriggerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `1px solid ${vars.colors.grayscale20}`,
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
  cursor: 'pointer',
  padding: '1.6rem 2rem',
  height: '5.6rem',
  width: '16.6rem',
  boxSizing: 'border-box',
});

export const dropdownListStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  position: 'absolute',
  top: '100%',
  marginTop: '0.8rem',
  left: 0,
  zIndex: 3,
  overflow: 'hidden',
  borderRadius: '12px',
  backgroundColor: vars.colors.white,
  padding: '0.4rem',
  boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.10)',
});

export const dropdownItemBase = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  cursor: 'pointer',
  color: vars.colors.grayscale50,
  borderRadius: '10px',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.grayscale5,
    },
  },
});

// 선택된 경우
export const dropdownItemSelected = style({
  backgroundColor: vars.colors.primary5,
  color: vars.colors.primary50,
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.primary10,
    },
  },
});

// padding-inline: text vs element
export const dropdownItemPadding = styleVariants({
  text: { paddingInline: '1.6rem' },
  element: { paddingInline: '0.6rem' },
});

// font style: small vs large
export const dropdownItemFont = styleVariants({
  small: fontStyles.sm_caption_medium,
  large: fontStyles.md2_text_medium,
});

export const arrowStyle = styleVariants({
  open: { transform: 'rotate(180deg)' },
  closed: { transform: 'rotate(0deg)' },
});

export const buttonBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.6rem',
  height: '2.6rem',
  borderRadius: '8px',
  color: vars.colors.primary20,
  border: `1px solid ${vars.colors.primary20}`,
  backgroundColor: vars.colors.white,
  transition: 'all 150ms ease',
});

export const buttonOpen = style({
  color: vars.colors.primary50,
  border: `1px solid ${vars.colors.primary50}`,
});
