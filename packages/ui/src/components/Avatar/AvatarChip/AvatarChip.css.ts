import { vars } from '@repo/theme'
import { style, styleVariants } from '@vanilla-extract/css'

export const colorList = [
  '#FF2A3A',
  '#EE6B00',
  '#E2A500',
  '#009857',
  '#0084BC',
  '#2C60FF',
  '#813DFF',
  '#F25DEB',
  '#7F82A1',
  '#5A5C72',
] as const

export const container = style({
  display: 'flex',
  alignItems: 'center',
})

export const circle = style({
  width: '2.4rem',
  height:'2.4rem',
  borderRadius: '50%',
  padding: '0.1rem 0.5rem',
  display: 'flex',
  alignSelf: 'center',
  justifyContent: 'center',
  border: `1px solid ${vars.colors.white}`,
})

export const circleWrapper = style({
  selectors: {
    '&:not(:first-child)': {
      marginLeft: '-0.5rem',
    },
  },
})

export const bg = styleVariants(
  Object.fromEntries(
    colorList.map((c, i) => [i.toString(), { backgroundColor: c }])
  ) as Record<string, {}>
)