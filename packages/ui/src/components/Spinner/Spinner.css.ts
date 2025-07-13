import { style, keyframes } from '@vanilla-extract/css';

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const spinnerDash = keyframes({
  '0%': { strokeDashoffset: '37.7' },
  '50%': { strokeDashoffset: '9.42' },
  '100%': { strokeDashoffset: '37.7' },
});

export const spinner = style({
  animation: `${spin} 1s linear infinite`,
});

export const spinnerCircle = style({
  animation: `${spinnerDash} 1.5s ease-in-out infinite`,
});