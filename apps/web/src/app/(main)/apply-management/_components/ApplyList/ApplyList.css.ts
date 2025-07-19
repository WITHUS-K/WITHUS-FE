import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  backgroundColor: vars.colors.white,
  width: '100%',
  height: '100%',
  //paddingBottom: '4.4rem',
  border: `1px solid ${vars.colors.grayscale5}`,
});

export const listContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  paddingTop: '0.6rem',
  paddingLeft: '0.6rem',
  paddingRight: '0.6rem',
  paddingBottom: '0.6rem',
  width: '100%',
  maxHeight: '50rem',
  overflowY: 'auto',

  selectors: {
    '&::-webkit-scrollbar': {
      width: '2px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: vars.colors.grayscale10,
      borderRadius: '2px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
  },
});

export const emptyContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  height: '38rem',
});
