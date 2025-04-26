import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const container = style({
  position: 'relative',
  display: 'inline-block',
  overflow: 'visible',
});

export const trigger = style({
  cursor: 'pointer',
});

export const bubble = style({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  marginLeft: 'var(--offset-x, 0px)',
  backgroundColor: vars.colors.primary10,
  borderRadius: '6px',
  padding: '0.5rem 1.4rem',
  whiteSpace: 'nowrap',
  zIndex: 4,
});

export const top = style({
  top: 'auto',
  bottom: '100%',
  marginBottom: '1rem',
});

export const bottom = style({
  top: '100%',
  bottom: 'auto',
  marginTop: '1rem',
});

export const arrow = style({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 0,
  height: 0,
});

export const arrowTop = style({
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',
  borderTop: `6px solid ${vars.colors.primary10}`,
  bottom: '-6px',
});

export const arrowBottom = style({
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',
  borderBottom: `6px solid ${vars.colors.primary10}`,
  top: '-6px',
});
