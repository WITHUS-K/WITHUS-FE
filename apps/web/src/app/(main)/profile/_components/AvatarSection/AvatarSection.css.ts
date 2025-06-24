import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '4.8rem 4.6rem',
  borderRadius: '24px',
  background: vars.colors.white,
  border: `1px solid ${vars.colors.grayscale5}`,
});

export const circle = style({
  display: 'flex',
  // alignItems:'center',
  //justifyContent:'center',

  position: 'relative',
  width: '18rem',
  height: '18rem',
  borderRadius: '50%',
  border: `1px solid ${vars.colors.grayscale10}`,
  background: vars.colors.grayscale5,
});

export const profileImage = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const emptyProfile = style({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const hiddenInput = style({
  position: 'absolute',
  width: 0,
  height: 0,
  opacity: 0,
  pointerEvents: 'none',
});

export const editButton = style({
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: '4.4rem',
  height: '4.4rem',
  borderRadius: '50%',
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.grayscale10}`,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
