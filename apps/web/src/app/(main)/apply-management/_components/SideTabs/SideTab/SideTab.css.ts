import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const panel = style({
  position: 'fixed',
  top: '6rem',
  right: 0,
  width: '56rem',
  background: vars.colors.white,
  display: 'flex',
  flexDirection: 'column',
  zIndex: 1000,
  boxShadow: 'rgba(0,0,0,0.1) -2px 0 8px',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.8rem 1.2rem',
  height: '4rem',
  width: '100%',
  backgroundColor: '#1F44B5',
});

export const content = style({
  flex: 1,
  width: '100%',
  padding: '1.6rem',
});

export const collapsedButton = style({
  position: 'fixed',
  bottom: '4.4rem',
  right: '0',
  width: '17.5rem',
  height: '3.8rem',
  backgroundColor: '#1F44B5',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.7rem',
  zIndex: 1000,
});
