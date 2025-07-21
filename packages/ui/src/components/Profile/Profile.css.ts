import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const profileWrapper = style({
  display: 'flex',
  width: '2.5rem',
  height: '2.5rem',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
});

export const profileItem = style({
  //width: '2.5rem',
  //height: '2.5rem',
  borderRadius: '50%',
  //backgroundColor: vars.colors.black,
  border: `1px solid ${vars.colors.grayscale5}`,
});

export const profileImage = style({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  objectFit: 'cover',
});

export const emptyProfile = style({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  objectFit: 'cover',
  backgroundColor: vars.colors.grayscale20,
});
