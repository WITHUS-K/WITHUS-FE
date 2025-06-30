import { fontStyles, vars } from "@repo/theme";
import { style } from "@vanilla-extract/css";

export const dateChip = style({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '5.6rem',
    padding: '1.6rem',
    borderRadius: '12px',
    border: `1px solid ${vars.colors.grayscale20}`,
    background: vars.colors.white,
    color: vars.colors.grayscale70,
    cursor: 'pointer',
    ...fontStyles.md2_text_regular,
    selectors: {
      '&:disabled': {
        borderColor: vars.colors.grayscale20,
        background: vars.colors.grayscale5,
        color: vars.colors.grayscale10,
        cursor: 'not-allowed',
      },
    },
  });
  
  export const dateChipSelected = style({
    borderColor: vars.colors.primary50,
    color: vars.colors.primary50,
  });
  
  export const timeList = style({
    padding: '1.2rem',
    border: `1px solid ${vars.colors.grayscale20}`,
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  });
  