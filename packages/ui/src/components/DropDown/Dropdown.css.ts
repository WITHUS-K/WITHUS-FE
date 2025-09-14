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
   overflow: 'hidden',    
});

export const academicStatusTriggerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `1px solid ${vars.colors.grayscale20}`,
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
  cursor: 'pointer',
  padding: '1.6rem 2rem',
  height: '5.6rem',
  width: '30.1rem',
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

export const dropdownListWrapper = style({
  position: 'absolute',
  top: '100%',
  marginTop: '0.8rem',
  left: 0,
  zIndex: 1000,

  borderRadius: '12px',
  backgroundColor: vars.colors.white,
  boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.10)',

  overflow: 'hidden',
});

export const dropdownListInner = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',

  maxHeight: '22rem',
  overflowY: 'auto',
  padding: '0.4rem',

  // 스크롤바 스타일
  selectors: {
    '&::-webkit-scrollbar': {
      width: '2px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: vars.colors.grayscale10,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
  },
});

export const dropdownItemBase = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  cursor: 'pointer',
  color: vars.colors.grayscale50,
  borderRadius: '10px',
  whiteSpace: 'nowrap',
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
  text: { padding: '0.5rem 1.6rem' },
  element: { padding: '0.5rem 0.6rem' },
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

export const rolesDropdwon = style({
  position: 'relative',
  display: 'inline-block',
});

export const triggerBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 1.6rem',
  gap: '0.5rem',
  borderRadius: '12px',
  backgroundColor: vars.colors.white,
  width: '100%',
  boxSizing: 'border-box',
  cursor: 'pointer',
});

export const triggerClosed = style({
  border: `1px solid ${vars.colors.grayscale20}`,
});

export const triggerOpen = style({
  border: `1px solid ${vars.colors.primary50}`,
});

export const commonText = style({
  maxWidth: '25rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const iconBase = style({
  transition: 'transform 0.2s ease',
});

export const iconClosed = style([
  iconBase,
  {
    transform: 'rotate(0deg)',
    color: vars.colors.grayscale40,
  },
]);

export const iconOpen = style([
  iconBase,
  {
    transform: 'rotate(180deg)',
    color: vars.colors.primary50,
  },
]);

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '7.5rem',
  height: '2.4rem',
  borderRadius: '6px',
  ...fontStyles.xs_caption_medium,
});

// default “선택”
export const selected = style({
  backgroundColor: vars.colors.grayscale5,
  color: vars.colors.grayscale50,
});

// “보류”
export const onHold = style({
  backgroundColor: vars.colors.grayscale10,
  color: vars.colors.grayscale70,
});

// “합격” 공통 스타일
export const pass = style({
  backgroundColor: '#D9FFE2',
  color: '#009857',
});

// “불합격” 공통 스타일
export const fail = style({
  backgroundColor: '#FFE6E9',
  color: '#FF2A3A',
});

export const dropdownItemLabel = style({
  flex: 1,
  minWidth: '25rem',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});
