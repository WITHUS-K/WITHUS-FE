import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const root = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '7.5rem',
  height: '2.4rem',
  borderRadius: '6px',
  ...fontStyles.xs_caption_medium,
});

// default “선택”
export const selected = style({
  backgroundColor: vars.colors.grayscale5,
  color: vars.colors.grayscale50,
});

// “보류”
export const onHold = style({
  backgroundColor: vars.colors.grayscale10,
  color: vars.colors.grayscale70,
});

// “합격” 공통 스타일
export const pass = style({
  backgroundColor: '#D9FFE2',
  color: '#009857',
});

// “불합격” 공통 스타일
export const fail = style({
  backgroundColor: '#FFE6E9',
  color: '#FF2A3A',
});
