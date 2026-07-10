import { vars } from '@repo/theme'
import { style } from '@vanilla-extract/css'

export const root = style({
  background: vars.colors.white,
  borderRadius: '2.4rem',
  padding: '2rem',
  border: `1px solid ${vars.colors.grayscale5}`,
  width: '100%',
  height: '100%',
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem'
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const subheader = style({
  borderRadius: '8px',
  gap: '0.2rem',
  backgroundColor: vars.colors.grayscale5,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf:'stretch',
  padding: '0.6rem 0.8rem'
})

export const list = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
})

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
})
