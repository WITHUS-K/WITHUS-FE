import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const profileWrapper = style({
  display: 'flex',
  width: '24px',
  height: '24px',
  justifyContent: 'center',
  alignItems: 'center',
  flexShrink: 0,
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
