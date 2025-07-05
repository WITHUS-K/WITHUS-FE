import { style } from '@vanilla-extract/css';
import { vars, fontStyles } from '@repo/theme';

export const standardSection = style({
  padding: '2rem',
  backgroundColor: vars.colors.white,
  borderRadius: '22px',
  border: `1px solid ${vars.colors.grayscale5}`,
});

export const infoText = style({
  padding: '0.9rem 1.2rem',
  borderRadius: '18px',
  display: 'flex',
  alignItems: 'center',
  border: `1px solid ${vars.colors.primary20}`,
  color: vars.colors.primary40,
  gap: '0.6rem',
  ...fontStyles.sm_caption_medium,
  backgroundColor: vars.colors.white,
});

export const itemCard = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  alignItems: 'flex-start',
  gap: '1.6rem',
});

export const container = style({
  backgroundColor: vars.colors.grayscale5,
  padding: '2rem',
  borderRadius: '30px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

export const itemDetailCard = style({
  backgroundColor: vars.colors.white,
  padding: '1.6rem',
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1.6rem',
});

export const addButton = style({
  display: 'flex',
  gap: '0.8rem',
  borderRadius: '8px',
  backgroundColor: 'transparent',
  padding: '0.8rem 1rem',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.grayscale5,
    },
  },
});

export const headerInfo = style({
  padding: '1rem 2rem',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  backgroundColor: vars.colors.grayscale20,
  gap: '1.6rem',
  ...fontStyles.sm_caption_semibold,
});

export const headerInfoDetail = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: vars.colors.grayscale70,
});

export const headerInfoBtn = style({
  color: vars.colors.grayscale90,
  textDecoration: 'underline',
  cursor: 'pointer',
});
