import { vars } from "@repo/theme";
import { style } from "@vanilla-extract/css";

export const listWrapper = style({
  width: '1101px',
  height: '56px',
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'center',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: `1px solid ${vars.colors.grayscale20}`,
  padding: '1.6rem',
  backgroundColor: vars.colors.white,
  borderRadius: '12px'
});

export const listRightSection = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
});