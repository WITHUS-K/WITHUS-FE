import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const wrapper = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  border: `1px solid ${vars.colors.grayscale20}`,
  width: '1.8rem',
  height: '1.8rem',
  cursor: 'pointer',
  transition: 'border-color 0.2s',

  selectors: {
    '&::after': {
      content: '""',
      position: 'absolute',
      width: '1rem',
      height: '1rem',
      borderRadius: '50%',
      backgroundColor: vars.colors.primary50,
      opacity: 0,
      transition: 'opacity 0.2s',
    },
  },
});

export const checked = style({
  borderColor: vars.colors.primary50,

  selectors: {
    '&::after': {
      opacity: 1,
    },
  },
});

export const input = style({
  position: 'absolute',
  opacity: 0,
  width: 0,
  height: 0,
});
