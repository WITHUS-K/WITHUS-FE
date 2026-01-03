import { style, styleVariants } from '@vanilla-extract/css';
import { fontStyles, vars } from '@repo/theme';

export const headerButton = style({
  all: 'unset',
  flex: 1,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

export const title = style({
  fontSize: '1.6rem',
  lineHeight: 1.5,
  color: vars.colors.grayscale90,
});

export const accordianListRightSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.9rem',
});


export const arrowIcon = style({
  transition: 'transform 0.2s ease',
  cursor: 'pointer',
  minWidth: '24px', 
  minHeight: '24px',
});

export const arrowRotated = style({
  transform: 'rotate(180deg)',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.white,
  color: vars.colors.grayscale90,
  ...fontStyles.md2_text_regular,
  marginTop: '1.6rem', 
  paddingTop: '1.6rem', 
  borderTop: `1px dashed ${vars.colors.grayscale20}`, 
});

export const readOnlyContentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.bg,
  color: vars.colors.grayscale90,
  ...fontStyles.md2_text_regular,
  marginTop: '1.6rem',
  paddingTop: '1.6rem',
  borderTop: `1px dashed ${vars.colors.grayscale20}`,
});

export const answerContainer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start', 
  gap: '1.2rem',
  width: '100%',
});

export const listWrapperBase = style({
  display: 'flex',
  border: `1px solid ${vars.colors.grayscale20}`,
  padding: '1.6rem',
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
  width: '100%',
  selectors: {
    '&[data-read-only="true"]': {
      backgroundColor: vars.colors.bg,
      border: `1px solid ${vars.colors.grayscale5}`,
    },
  },
});

export const listWrapperDir = styleVariants({
  row: {
    flexDirection: 'row',
    justifyItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    gap: '0',
  },
});

export const clampedContent = style({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 1, 
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  wordBreak: 'break-all',
  flex: 1, 
});

export const expandedContent = style({
  display: 'block',
  overflow: 'visible',
  flex: 1,
});

export const listRightSection = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
});