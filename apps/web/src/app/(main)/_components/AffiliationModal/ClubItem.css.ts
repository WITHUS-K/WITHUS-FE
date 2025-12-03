import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const containerStyle = style({
  padding: '2.6rem 0',
  borderBottom: `1px solid ${vars.colors.grayscale10}`,
});
