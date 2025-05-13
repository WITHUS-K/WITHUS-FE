import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const row = style({
  display: 'flex',
  alignItems: 'center',

  borderRadius: '8px',
  padding: '1.1rem 0.6rem',
  width: '100%',
  selectors: {
    '&[data-selected="true"]': { backgroundColor: vars.colors.primary5 },
  },
});

export const cbCell = style({ width: '4rem', textAlign: 'center' });
export const cell = style({
  flex: '1 1 auto',
  padding: '0 1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const buttonBase = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.6rem',
  height: '2.6rem',
  borderRadius: '8px',
  color: vars.colors.primary20,
  border: `1px solid ${vars.colors.primary20}`,
  backgroundColor: vars.colors.white,
  transition: 'all 150ms ease',
});
