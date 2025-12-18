import { colors, fontStyles } from "@repo/theme";
import { style } from "@vanilla-extract/css";

export const inputChipWrapper = style({
  display: 'inline-flex',
  position: 'relative',
  padding: '0.6rem 0.8rem',
  alignItems: 'center',
  gap: '0.4rem', 
  backgroundColor: colors.grayscale5,
  borderRadius: '6px',
  minWidth: 'fit-content',
});

export const inputStyle = style({
  position: 'absolute', 
  left: '0.8rem',
  width: 'calc(100% - 3.2rem)', 
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: colors.grayscale70,
  ...fontStyles.xs_caption_medium,
});

export const ghostText = style({
  ...fontStyles.xs_caption_medium,
  visibility: 'hidden',
  whiteSpace: 'pre', 
  pointerEvents: 'none',
  minWidth: '1.2rem',
});

export const buttonStyle = style({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  zIndex: 1, 
});