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

export const subheaderBar = style({
  borderRadius: '8px',
  backgroundColor: vars.colors.grayscale5,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0.6rem 0.8rem',
});

export const userItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  padding: '0.8rem 0',
});
