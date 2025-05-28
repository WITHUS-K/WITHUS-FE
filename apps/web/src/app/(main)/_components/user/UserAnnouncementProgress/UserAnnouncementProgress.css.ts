import { style } from '@vanilla-extract/css';
import { vars }  from '@repo/theme';

export const root = style({
  background: vars.colors.white,
  borderRadius: '2.4rem',
  padding: '2rem',
  border: `1px solid ${vars.colors.grayscale5}`,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '3.4rem',
  height: '16.7rem',
});

export const timeline = style({
  position: 'relative',
  height:  '4px',
  marginBottom:  '1.6rem',
});

export const track = style({
  position: 'absolute',
  top: 0,
  left:  0,
  right: 0,
  bottom: 0,
  background: vars.colors.grayscale5,
  borderRadius: '2px',
});

export const fill = style({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  background: vars.colors.primary50,
  borderRadius: '2px',
});

export const marker = style({
  position: 'absolute',
  top: '50%',
  transform:  'translate(-50%, -50%)',
  width: '16px',
  height:'16px',
  borderRadius:'50%',
  background: vars.colors.grayscale5,
  selectors: {
    '&[data-active="true"]': {
      borderColor: vars.colors.primary50,
      background: vars.colors.primary50,
    },
  },
});

export const labelItem = style({
  position: 'absolute',
  top: '1.6rem',       
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
  whiteSpace: 'nowrap',
});