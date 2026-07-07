import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

const shimmer = keyframes({
  '0%': { backgroundPosition: '-200% 0' },
  '100%': { backgroundPosition: '200% 0' },
});

export const skeletonBlock = style({
  background: `linear-gradient(90deg, ${vars.colors.grayscale5} 25%, ${vars.colors.grayscale10} 50%, ${vars.colors.grayscale5} 75%)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 2.8s linear infinite`,
  borderRadius: '0.8rem',
  flexShrink: 0,
});

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4rem',
  padding: '2.4rem',
  width: '100%',
});

export const headerRow = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.2rem',
  marginLeft: '0.5rem',
});

export const card = style({
  background: vars.colors.white,
  borderRadius: '2.4rem',
  padding: '2rem',
  border: `1px solid ${vars.colors.grayscale5}`,
  width: '100%',
});

export const cardFixed = style({
  background: vars.colors.white,
  borderRadius: '2.4rem',
  padding: '2rem',
  border: `1px solid ${vars.colors.grayscale5}`,
  width: '100%',
  height: '34.7rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  overflow: 'hidden',
});

export const row = style({
  display: 'flex',
  width: '100%',
});

export const col = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const partCard = style({
  background: vars.colors.bg,
  borderRadius: '16px',
  padding: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  width: '100%',
});

export const dividerV = style({
  width: '1px',
  height: '8rem',
  background: vars.colors.grayscale10,
  flexShrink: 0,
  alignSelf: 'center',
});
