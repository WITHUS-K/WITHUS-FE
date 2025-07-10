import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
});

export const row = style({
  display: 'flex',
  gap: '1.6rem',
  width: '100%',
});

export const rowItemWide = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
  flex: '1 1 0',
  minWidth: 0,
});

export const rowItemAuto = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
  flex: '0 0 auto',
});

export const rowItemAuto1 = style({
  display: 'flex',
  alignItems: 'center',
  //gap: '1.6rem',
  flex: '0 0 auto',
});

export const fieldGrowForSchool = style({
  flex: '1 1 0',
  minWidth: 0,
});

export const fieldAuto = style({
  flex: '0 0 auto',
});

export const fieldGrow = style({
  flex: '1 0 0',
  width: '100%',
});
