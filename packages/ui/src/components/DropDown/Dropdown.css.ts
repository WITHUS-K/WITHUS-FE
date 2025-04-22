import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const dropdownRootStyle = style({
  position: 'relative',
  display: 'inline-block',
});

export const triggerStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `1px solid ${vars.colors.grayscale20}`,
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
  cursor: 'pointer',
  padding: '1.6rem 2rem',
  height: '5.6rem',
  width: '19.7rem',
  boxSizing: 'border-box',
});

export const clubTriggerStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  cursor: 'pointer',
  boxSizing: 'border-box',
});

export const dropdownListStyle = style({
  position: 'absolute',
  top: '100%',
  marginTop: '0.8rem',
  left: 0,
  zIndex: 3,
  width: '16.1rem',
  overflow: 'hidden',
  borderRadius: '12px',
  backgroundColor: vars.colors.white,
  boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
});

export const dropdownItemStyle = style({
  display: 'flex',
  width: '100%',
  height: '4.8rem',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: vars.colors.grayscale70,

  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.primary5,
      color: vars.colors.primary50,
    },
  },
});

export const arrowStyle = styleVariants({
  open: { transform: 'rotate(180deg)' },
  closed: { transform: 'rotate(0deg)' },
});
