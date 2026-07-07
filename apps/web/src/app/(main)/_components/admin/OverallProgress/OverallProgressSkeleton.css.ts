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

export const root = style({
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

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const tabGroup = style({
  display: 'flex',
  gap: '1.2rem',
});

export const progressCard = style({
  padding: '1.2rem',
  background: vars.colors.grayscale5,
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const cardRow = style({
  display: 'flex',
  gap: '1.2rem',
  alignItems: 'center',
});

export const progressInner = style({
  background: vars.colors.white,
  padding: '1.2rem',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const progressInfoRow = style({
  display: 'flex',
  justifyContent: 'space-between',
});
