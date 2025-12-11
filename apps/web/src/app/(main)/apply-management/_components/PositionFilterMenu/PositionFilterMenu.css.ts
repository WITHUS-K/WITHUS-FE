import { style } from '@vanilla-extract/css';
import { vars, fontStyles } from '@repo/theme';

export const container = style({
  position: 'relative',
  display: 'inline-block',
});

export const trigger = style({
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.2rem',
  ...fontStyles.xs_caption_medium,
  color: vars.colors.grayscale40,
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  position: 'absolute',
  top: '100%',
  left: 0,
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
  width: '10.6rem', // 필요하면 넓이 조정
  padding: '0.4rem',
  marginTop: '4px',
  zIndex: 1000,
  boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.10)',
});

export const item = style({
  display: 'flex',
  width: '100%',
  padding: '0.5rem 1.6rem',
  borderRadius: '10px',
  cursor: 'pointer',
  color: vars.colors.grayscale50,
  selectors: {
    '&:hover': { backgroundColor: vars.colors.grayscale5 },
  },
  ...fontStyles.sm_caption_medium,
});

export const itemSelected = style({
  backgroundColor: vars.colors.primary5,
  color: vars.colors.primary50,
  selectors: {
    '&:hover': { backgroundColor: vars.colors.primary10 },
  },
});
