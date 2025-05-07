import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
});

export const header = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '2.4rem',
  width: '100%',
});

export const contentColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  flex: 1,        
  width: '100%',
});

export const row = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.6rem',
  alignItems: 'center',
  width: '100%',
});

export const rowItem = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1.6rem',
  flex: 1,       
});

export const fieldWrapper = style({
  flex: 1,
  width: '100%', 
});

export const optionWrapper = style({
  display: 'flex',
  gap: '0.8rem',
  flex: 1,
  width: '100%',
});