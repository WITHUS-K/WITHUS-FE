import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const wrapper = style({
  position: 'relative',
  height: '2.5rem',
  display: 'flex',
  justifyContent: 'center',
  minWidth: '6.7rem',
  overflow: 'visible',
});

export const profileItem = style({
  position: 'absolute',
});

export const profileContainerItem = style({
  position: 'relative',
  borderRadius: '50%',
  border: `1px solid ${vars.colors.grayscale5}`,
});

export const countItem = style({
  position: 'absolute',
  width: '2.4rem',
  height: '2.4rem',
  backgroundColor: vars.colors.white,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
});
