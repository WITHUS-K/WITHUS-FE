import { style } from '@vanilla-extract/css';
import { fontStyles, vars } from '@repo/theme';

export const sidebarContainer = style({
  width: '240px',
  height: '100%',
  backgroundColor: vars.colors.white,
  display: 'flex',
  flexDirection: 'column',
  borderRight: `1px solid ${vars.colors.grayscale10}`,
  paddingLeft: '2.4rem',
  paddingRight: '2.4rem',
  paddingTop: '2.4rem',
  justifyContent: 'space-between',
  paddingBottom: '2.4rem',
});

export const sidebarList = style({
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
  gap: '0.8rem',
  flex: 1,
});

export const sidebarItemWrapper = style({
  display: 'flex',
  alignItems: 'start',
  padding: '1.2rem 1.6rem',
  color: vars.colors.grayscale50,
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, color 0.3s ease',
  ...fontStyles.md2_text_medium,
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.grayscale5,
      color: vars.colors.grayscale80,
    },
  },
});

export const siderbarItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1.2rem',
});

export const sidebarItemActive = style({
  backgroundColor: vars.colors.primary5,
  color: vars.colors.primary50,
  ...fontStyles.md2_text_semibold,
});

export const sidebarIcon = style({
  marginRight: '0.75rem',
  display: 'flex',
  alignItems: 'center',
});

export const sidebarLabel = style({
  whiteSpace: 'nowrap',
  paddingTop: '0.2rem',
});

export const sidebarOrgsOuter = style({
  width: '100%',
  overflow: 'hidden',
  borderRadius: '16px',
});

export const sidebarOrgs = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.grayscale5,
  borderRadius: '16px',
  padding: '1.2rem',
  gap: '0.8rem',
  width: '100%',
  overflowX: 'hidden',
  maxHeight: 'calc((3 * 3.7rem) + (2 * 0.8rem) + (2 * 1.2rem))',
  overflowY: 'auto',
  scrollbarGutter: 'stable both-edges',
  selectors: {
    '&::-webkit-scrollbar': {
      width: '2px',
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

export const orgPlus = style({
  color: vars.colors.grayscale50,
});

export const orgItem = style({
  flex: '0 0 auto',
  height: '3.7rem',
  width: '16.8rem',
});
