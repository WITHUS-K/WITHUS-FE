import { style } from '@vanilla-extract/css';
import { vars, fontStyles } from '@repo/theme';

export const root = style({
  display: 'grid',
  gridTemplateColumns: '32rem 1fr',
  gap: '1.6rem',
  width: '100%',
  padding: '1.6rem',
  backgroundColor: vars.colors.grayscale5,
  borderRadius: '12px',
});

export const panel = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  minHeight: '30rem',
  padding: '1.2rem',
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1rem',
});

export const createBox = style({
  display: 'grid',
  gridTemplateColumns: '1fr 7.2rem 7.2rem',
  gap: '0.8rem',
  alignItems: 'end',
});

export const input = style({
  width: '100%',
  height: '4rem',
  padding: '0 1.2rem',
  border: `1px solid ${vars.colors.grayscale10}`,
  borderRadius: '8px',
  backgroundColor: vars.colors.white,
  outline: 'none',
  ...fontStyles.sm_caption_regular,
  selectors: {
    '&:focus': {
      borderColor: vars.colors.primary50,
    },
  },
});

export const field = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const groupList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  overflowY: 'auto',
  paddingRight: '0.2rem',
});

export const groupItem = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.4rem',
  width: '100%',
  minHeight: '6.4rem',
  padding: '1rem',
  border: `1px solid ${vars.colors.grayscale10}`,
  borderRadius: '8px',
  backgroundColor: vars.colors.white,
  cursor: 'pointer',
  textAlign: 'left',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.grayscale5,
    },
  },
});

export const selectedGroupItem = style({
  borderColor: vars.colors.primary50,
  backgroundColor: vars.colors.primary5,
});

export const roleList = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(18rem, 1fr))',
  gap: '0.8rem',
  overflowY: 'auto',
  paddingRight: '0.2rem',
});

export const roleItem = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.8rem',
  minHeight: '5.2rem',
  padding: '0.8rem 1rem',
  border: `1px solid ${vars.colors.grayscale10}`,
  borderRadius: '8px',
});

export const roleMeta = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  minWidth: 0,
});

export const footer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.8rem',
  marginTop: 'auto',
});

export const empty = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  minHeight: '16rem',
  borderRadius: '8px',
  backgroundColor: vars.colors.grayscale5,
});
