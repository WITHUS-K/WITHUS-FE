import { vars } from '@repo/theme'
import { style } from '@vanilla-extract/css'

export const root = style({
  background: vars.colors.white,
  borderRadius: '2.4rem',
  padding: '2rem',
  border: `1px solid ${vars.colors.grayscale5}`,
  width: '100%'
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
})

export const link = style({
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  gap: '1.2rem',
  alignContent: 'center',
  justifyItems: 'center',
  color: vars.colors.grayscale50
})

export const content = style({
  display: 'flex',
  alignItems: 'center',
  alignSelf: 'stretch',
  marginTop: '2rem',
  gap: '3.2rem'
})

export const partsContainer = style({
  display: 'flex',
  gap: '2rem',
  flexGrow: 1,           
});

export const partCard = style({
  background: vars.colors.bg,
  borderRadius: '16px',
  padding: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.8rem',
  width: '100%'
})
