import { styleVariants } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const directionVariants = styleVariants({
  row: {
    width: '100%',
    height: 0,
    borderBottom: '1px solid',
    borderLeft: 'none',
  },
  column: {
    width: 0,
    height: '100%',
    borderLeft: '1px solid',
    borderBottom: 'none',
  },
});

export const colorVariants = styleVariants(vars.colors, (color) => ({
  borderColor: color,
}));