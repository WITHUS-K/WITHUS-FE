import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const buttonStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '2.4rem',
  height: '2.4rem',
  border: 'none',
  backgroundColor: vars.colors.grayscale5,
});

export const profileStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: '2.4rem',
  height: '2.4rem',
  padding: '1rem',
  backgroundColor: vars.colors.grayscale5,
});
