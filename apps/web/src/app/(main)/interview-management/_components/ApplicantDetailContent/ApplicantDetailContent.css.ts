import { colors, vars } from '@repo/theme'
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
  border: `1px solid ${vars.colors.grayscale20}`,
  padding: '1.6rem',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems:'center',
  gap: '2rem'
})