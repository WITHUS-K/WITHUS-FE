import { vars } from '@repo/theme'
import { style } from '@vanilla-extract/css'

export const root = style({
  background: vars.colors.white,
  borderRadius: '2.4rem',
  padding: '2rem',
  border: `1px solid ${vars.colors.grayscale5}`,
  width: '100%',
  height: '34.7rem',
  overflow: 'auto'
})

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 12,
  width: '100%'
})

export const title = style({
  margin: 0,
  fontSize: '1rem',
})

export const tabs = style({
  display: 'flex',
})


export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
})

export const card = style({
  padding: '1.2rem',
  background: vars.colors.grayscale5,
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem'
})

export const icon = style({
  padding: '0.8rem 1rem',
  backgroundColor: vars.colors.white,
  borderRadius: '24px',
  display: 'flex',
  alignItems: 'center' 
})

export const meta = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  width: '100%'
})

export const progressInfo = style({
  display: 'flex',
  justifyContent: 'space-between',
})

export const progressContainer = style({
  backgroundColor: vars.colors.white,
  padding: '1.2rem',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem'
})

export const barBackground = style({
  background: vars.colors.grayscale5,
  height: '0.8rem',
  borderRadius: '100px',  
  overflow: 'hidden',
})

export const barFill = style({
  height: '100%',
  background: vars.colors.primary30,
  borderRadius: '100px'
})