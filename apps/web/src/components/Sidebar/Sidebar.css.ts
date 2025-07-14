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

export const sidebarOrgs = style({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.grayscale5,
  borderRadius: '16px',
  padding: '1.2rem',
  gap: '0.8rem',
  width: '100%',
});
