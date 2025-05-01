import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  backgroundColor: vars.colors.white,
  width: '100%',
  border: `1px solid ${vars.colors.grayscale5}`,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  height: '4rem',
  width: '100%',
  borderBottom: `1px solid ${vars.colors.grayscale10}`,
  paddingInline: '1.2rem',
  ...fontStyles.xs_caption_medium,
  color: vars.colors.grayscale40,
});

export const listContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  padding: '0.6rem',
  width: '100%',
  maxHeight: '50rem',
  overflowY: 'auto',

  selectors: {
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: vars.colors.grayscale10,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
  },
});
