import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const layoutStyle = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
});

export const containerStyle = style({
  display: 'flex',
  flex: 1,
  overflowY: 'scroll',
  justifyContent: 'center',
});

export const headerStyle = style({
  borderBottom: `1px solid ${vars.colors.grayscale10}`,
  top: 0,
  left: 0,
  right: 0,
  height: '60px',
});
