import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const headerContainer = style({
  width: '100%',
  height: '60px',
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'center',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: `1px solid ${vars.colors.grayscale10}`,
  padding: '1.6rem 2.4rem',
  backgroundColor: vars.colors.white,
});

export const leftSection = style({
  display: 'flex',
  justifyItems: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer'
});

export const centerSection = style({
  flexGrow: 1,
});


export const notificationButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0.4rem',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  borderRadius: '6px',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.grayscale5,
    },
  },
});

export const divider = style({
  height: '1.8rem',
  border: `0.5px solid ${vars.colors.grayscale20}`,
})

export const badgeWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.6rem',
  padding: '0 0.6rem', 
  borderRadius: '6px',
  marginLeft: '0.4rem',
  border: `1px solid ${vars.colors.grayscale20}`,
})

export const profile = style({
  gap: '0.8rem',
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'center',
  justifyContent: 'center',
  alignItems: 'center',
})

export const profileWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.4rem',
  flexWrap: 'nowrap',
  padding: '0.4rem 0.4rem 0.4rem 0.8rem',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  borderRadius: '6px',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.grayscale5,
      color: vars.colors.primary30,
    },
  },
});

export const headerRightWrapper = style({
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'nowrap',
  gap: '1.2rem',
})