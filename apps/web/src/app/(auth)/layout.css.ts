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
