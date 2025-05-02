import { colors } from '@repo/theme'
import { style } from '@vanilla-extract/css'

export const content = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: colors.white,
  borderRadius: '20px',
  padding: '2.4rem',
  gap: '4rem',
})

export const comment = style({
  width: '100%',
  backgroundColor: colors.grayscale5,
  padding: '1.6rem',
  borderRadius: '8px',
})

export const editButton = style ({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.4rem',
  marginTop: '1rem',
})