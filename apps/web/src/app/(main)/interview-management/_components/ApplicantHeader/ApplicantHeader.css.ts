import { colors, fontStyles, vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'center',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '4rem'
})

export const profile = style({
  flex: 1,
  textAlign: 'center',
});

export const controlButton = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});

export const applicationButton = style({
  ...fontStyles.sm_caption_medium,
  padding: '0 1.2rem',
  background: colors.primary50,
  color: colors.white,
  border: 'none',
  cursor: 'pointer',
  borderRadius: '8px',
  textAlign: 'center',
  height: '3.2rem',
  transition: 'all 0.2s ease-in-out',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.primary60,
    },
  },
})