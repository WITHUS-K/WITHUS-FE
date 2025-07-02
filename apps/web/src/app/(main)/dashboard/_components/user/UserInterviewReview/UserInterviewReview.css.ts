import { style } from '@vanilla-extract/css';
import { vars, fontStyles } from '@repo/theme';

export const root = style({
  background: vars.colors.white,
  borderRadius: '2.4rem',
  padding: '2rem',
  border: `1px solid ${vars.colors.grayscale5}`,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  overflow:'auto',
  height: '38rem',
  width: '100%'
});

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const toggle = style({
  width: '100%'
});

export const dateNav = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
});

export const navButton = style({
  all: 'unset',
  cursor: 'pointer',
  color: vars.colors.grayscale60,
  selectors: {
    '&:hover': {
      color: vars.colors.grayscale70,
    },
  },
});

export const slots = style({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  borderLeft: `1px dashed ${vars.colors.grayscale10}`,
  width: '100%'
});

export const slot = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-start',
  padding: '0 0 1.6rem 1.6rem',
  width: '100%'
});

export const dot = style({
  position: 'absolute',
  left: '-0.7rem',
  top: '0',
  width: '1.2rem',
  height: '1.2rem',
  background: vars.colors.grayscale10,
  borderRadius: '50%',
});


export const card = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
  background: vars.colors.grayscale5,
  borderRadius:  '1.2rem',
  flexGrow: 1,
  padding: '1.2rem',
  width: '100%'
});

export const applicantTag = style({
  background: vars.colors.white,
  borderRadius:'6px',
  padding:'0.3rem 1rem',
  ...fontStyles.xs_caption_medium,
  color:vars.colors.grayscale70,
});

export const divider = style({
  width:'1px',
  backgroundColor:vars.colors.grayscale10,
  height: '1.6rem',
  margin: '0 1rem',
});