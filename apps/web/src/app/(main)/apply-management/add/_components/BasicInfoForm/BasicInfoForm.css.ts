import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
});

export const header = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '2.4rem',
  width: '100%',
});

export const contentColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  flex: 1,
  width: '100%',
});

export const row = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.6rem',
  alignItems: 'center',
  width: '100%',
});

// **이 두 가지가 새로 중요합니다!**
export const rowItem = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1.6rem',
  width: '100%',
});

export const fieldWrapper = style({
  flex: 1,
  width: '100%',
});

export const optionWrapper = style({
  display: 'flex',
  gap: '0.8rem',
  flex: 1,
  width: '100%',
});

export const imageContainer = style({
  position: 'relative',
  width: '15.6rem',
  height: '20.8rem',
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '12px',
  border: `1px solid ${vars.colors.grayscale10}`,
  backgroundColor: vars.colors.grayscale5,
  cursor: 'pointer',
});

export const imageInput = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
  zIndex: 2,
});

export const imagePreview = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '12px',
});