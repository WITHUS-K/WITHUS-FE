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
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: 14,
  color: 'white',
  border: '2px solid white',
})

export const circleWrapper = style({
  selectors: {
    '&:not(:first-child)': {
      marginLeft: -12,
    },
  },
})

export const bg = styleVariants(
  Object.fromEntries(
    colorList.map((c, i) => [i.toString(), { backgroundColor: c }])
  ) as Record<string, {}>
)