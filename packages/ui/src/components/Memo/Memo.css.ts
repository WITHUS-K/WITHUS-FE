import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  padding: '1.6rem',
  background: vars.colors.white,
  borderRadius: '16px',
  display:'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  width:"100%"
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignContent:'center',
  justifyItems: 'center',
  alignItems: 'center'
})

export const avatar = style({
  width: '3.2rem',
  height: '3.2rem',
  borderRadius: '50%',
  objectFit: 'cover',
});

export const comment = style({
  whiteSpace: 'pre-wrap',
  lineHeight: '1.6',
});

export const textarea = style({
  all: 'unset',
  width: '100%',
  padding: '0.8rem',
});