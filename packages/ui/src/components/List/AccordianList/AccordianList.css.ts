import { style, styleVariants } from '@vanilla-extract/css';
import { fontStyles, vars } from '@repo/theme';


export const headerButton = style({
  all: 'unset',
  flex: 1,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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

export const toggleButton = style({
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
});

export const arrowIcon = style({
  transition: 'transform 0.2s ease',
  selectors: {
    [`${headerButton}[aria-expanded="true"] &`]: {
      transform: 'rotate(180deg)',
    },
  },
});

export const contentWrapper = style({
  display: 'flex',
  gap: '1.6rem',
  flexDirection: 'column',
  backgroundColor: vars.colors.white,
  color: vars.colors.grayscale90,
  ...fontStyles.md2_text_regular,
});

export const readOnlyContentWrapper = style({
  display: 'flex',
  gap: '1.6rem',
  flexDirection: 'column',
  backgroundColor: vars.colors.bg,
  color: vars.colors.grayscale90,
  ...fontStyles.md2_text_regular,
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
  row:    { 
    flexDirection: 'row',   
    justifyItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  column: { 
    flexDirection: 'column',
    gap: '1.6rem',
  },
});

export const listRightSection = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
});