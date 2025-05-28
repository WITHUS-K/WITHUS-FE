import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const root = style({
  background: vars.colors.white,
  borderRadius:'2.4rem',
  padding:'2rem',
  border:`1px solid ${vars.colors.grayscale5}`,
  display:'flex',
  flexDirection:'column',
  gap: '1.6rem',
  height: '38rem',
  overflowY: 'auto',
  width: '100%'
});

export const header = style({
  display: 'flex',
  justifyContent:'space-between',
  alignItems: 'center',
});

export const button = style({
  display: 'flex',
  gap: '1.2rem',
  alignItems: 'center'
})

export const toggle = style({
  width: '100%'
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(18rem, 1fr))',
  gap: '1.6rem',
});

export const card = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  background: vars.colors.white,
  border: `1px solid ${vars.colors.grayscale5}`,
  borderRadius: '1.2rem',
  padding: '1rem',
});