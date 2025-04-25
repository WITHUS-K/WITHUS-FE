import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const profileContainer = style({
  padding: '0.6rem 0.8rem',
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
});

export const profileItemContainer = style({
  padding: '1.6rem 0',
  borderBottom: `1px solid ${vars.colors.grayscale10}`,
});

export const assignedGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, auto)',
  gap: '0.5rem',
});

export const gridContainer = style({
  padding: '1.6rem',
  backgroundColor: vars.colors.grayscale5,
  borderRadius: '12px',
});
