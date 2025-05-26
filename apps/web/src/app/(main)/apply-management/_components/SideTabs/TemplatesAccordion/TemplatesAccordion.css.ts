import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const accordion = style({
  border: `1px solid ${vars.colors.grayscale10}`,
  padding: '0.6rem',
  borderRadius: '12px',
  background: vars.colors.white,
});

export const header = style({
  width: '100%',
  padding: '0.6rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
});

export const rotated = style({
  transform: 'rotate(-180deg)',
});

export const body = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  marginTop: '0.6rem',
});

export const list = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0.8rem',
});

export const newInput = style({
  width: '16.667rem',
  height: '3.2rem',
  borderRadius: '8px',
  backgroundColor: vars.colors.primary5,
  color: vars.colors.primary50,
  ...fontStyles.sm_caption_medium,
  textAlign: 'center',
  border: 'none',
  outline: 'none',
});
