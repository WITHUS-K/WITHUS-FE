import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const dividerStyle = style({
  width: '100%',
  backgroundColor: vars.colors.grayscale10,
  height: '1px',
});
