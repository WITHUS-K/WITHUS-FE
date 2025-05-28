import { fontStyles, vars } from '@repo/theme'
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
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '1.6rem',
  marginBottom: '1.6rem',
})

export const arrow = style({
  color: vars.colors.grayscale60
})

export const events = style({
  listStyle: 'none',
  padding: 0,
  borderLeft: `1px dashed ${vars.colors.grayscale10}`,
  width: '100%'
})

export const event = style({
  position: 'relative',
  display: 'flex',
  padding: '0 0 1.6rem 1.6rem',
})

export const dot = style({
  position: 'absolute',
  left: '-0.7rem',
  width: '1.2rem',
  height: '1.2rem',
  background: vars.colors.grayscale10,
  borderRadius: '50%',
})

export const label = style({
  background: vars.colors.grayscale5,
  padding: '1.2rem',
  borderRadius: '12px',
  width: '100%',
  color: vars.colors.grayscale70,
  ...fontStyles.sm_caption_medium
})