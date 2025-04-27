import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const paginationStyle = style({
  position: 'fixed',
  bottom: '0',
  right: '0',
  left: '240px', //사이드바 넓이만큼 옆으로!
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '4.4rem',
  borderTop: `1px solid ${vars.colors.grayscale10}`,
});
