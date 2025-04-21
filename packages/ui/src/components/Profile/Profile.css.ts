import { style } from '@vanilla-extract/css';

export const profileWrapper = style({
  display: 'flex',
  width: '24px',
  height: '24px',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
});

export const profileImage = style({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  objectFit: 'cover',
});