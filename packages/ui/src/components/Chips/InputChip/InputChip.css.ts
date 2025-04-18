import { colors, fontStyles } from "@repo/theme";
import { style } from "@vanilla-extract/css";

export const inputChipWrapper = style({
  display: 'inline-flex',
  padding: '0.6rem 0.8rem',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
  backgroundColor: colors.grayscale5,
  borderRadius: '6px'
})

export const inputStyle = style({
  border: 'none',
  outline: 'none',
  background: 'transparent',
  minWidth: '2.4rem',
  color: colors.grayscale70,
  ...fontStyles.xs_caption_medium
})

export const buttonStyle = style({
  cursor: 'pointer',
})