import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { vars } from '@/themes/theme.css';

// 색상 속성
const colorProperties = defineProperties({
  properties: {
    color: vars.colors,
    background: vars.colors,
    borderColor: vars.colors,
  },
  shorthands: {
    bg: ['background'],
    border: ['borderColor'],
  },
});

// 둥근 모서리 속성
const spaceProperties = defineProperties({
  properties: {
    borderRadius: vars.borderRadius,
  },
});

// 타이포그래피 속성
const typographyProperties = defineProperties({
  properties: {
    fontSize: vars.typography.fontSize,
    fontWeight: vars.typography.fontWeight,
  },
});

// 레이아웃 속성
const layoutProperties = defineProperties({
  properties: {
    display: ['none', 'block', 'inline', 'inline-block', 'flex', 'grid'],
    flexDirection: ['row', 'column'],
    justifyContent: [
      'center',
      'flex-start',
      'flex-end',
      'space-between',
      'space-around',
    ],
    alignItems: ['center', 'flex-start', 'flex-end', 'stretch'],
    flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
    textAlign: ['left', 'center', 'right'],
    whiteSpace: ['nowrap', 'normal', 'pre'],
    overflow: ['hidden', 'auto'],
    cursor: ['pointer', 'default'],

    borderRadius: vars.borderRadius,
  },
  shorthands: {
    border: ['borderRadius'],
  },
});

export const sprinkles = createSprinkles(
  colorProperties,
  spaceProperties,
  typographyProperties,
  layoutProperties
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
