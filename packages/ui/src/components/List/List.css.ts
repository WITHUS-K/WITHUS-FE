import { vars } from "@repo/theme";
import { style, styleVariants } from "@vanilla-extract/css";

export const listWrapperBase = style({
  display: 'flex',
  border: `1px solid ${vars.colors.grayscale20}`,
  padding: '1.6rem',
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
  width: '100%',
    selectors: {
    '&[data-read-only="true"]': {
      backgroundColor: vars.colors.white,
      border: 'none',
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