import { vars } from '@repo/theme';
import { style, styleVariants } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  alignItems: 'center',
});

export const circle = style({
  width: '2.4rem',
  height: '2.4rem',
  borderRadius: '50%',
  padding: '0.1rem 0.5rem',
  display: 'flex',
  alignSelf: 'center',
  justifyContent: 'center',
  border: `1px solid ${vars.colors.white}`,
});

export const circleWrapper = style({
  selectors: {
    '&:not(:first-child)': {
      marginLeft: '-0.5rem',
    },
  },
});
