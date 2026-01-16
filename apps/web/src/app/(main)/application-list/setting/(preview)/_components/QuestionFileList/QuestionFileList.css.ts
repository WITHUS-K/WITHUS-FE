import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',
  width: '100%',
});

export const questionContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
});
