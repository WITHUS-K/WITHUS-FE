import { vars } from '@repo/theme'
import { style } from '@vanilla-extract/css'

export const content = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
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