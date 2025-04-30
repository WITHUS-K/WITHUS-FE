import { colors } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const switchLabel = style({
  display: 'inline-block',
  position: 'relative',
  width: '34px',
  height: '18px',
  cursor: 'pointer',
  userSelect: 'none',
});

export const inputHidden = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
  margin: 0,
  padding: 0,
  zIndex: 2,
});

export const track = style({
  display: 'block',
  width: '100%',
  height: '100%',
  borderRadius: '9px',               
  transition: 'background-color 0.25s ease',
});

export const thumb = style({
  position: 'absolute',
  top: '2px',
  left: '2px',
  width: '14px',                      
  height: '14px',
  borderRadius: '50%',
  backgroundColor: colors.white,
  transition: 'transform 0.25s ease',
});