import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';
import { fontStyles } from '@repo/theme';
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

export const bubble = style({
  width: '2.4rem',
  height: '2.4rem',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...fontStyles.sm_caption_medium,
});
