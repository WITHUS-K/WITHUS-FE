import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  padding: '1.6rem 2rem',
  borderRadius: '12px',
  background: vars.colors.white,
  border: `1px solid ${vars.colors.grayscale20}`,
});

export const button = style({
  color: vars.colors.grayscale50,
  height: '2.4rem',
});

export const list = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1.6rem',
  width: '100%',
});
