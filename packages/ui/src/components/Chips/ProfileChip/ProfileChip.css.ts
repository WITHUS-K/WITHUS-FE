import { colors } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const profileChipWrapper = style({
  display: 'inline-flex',
  padding: '0.6rem 0.8rem',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.8rem',
  backgroundColor: colors.white,
  borderRadius: '6px'
})

export const buttonStyle = style({
  cursor: 'pointer',
})