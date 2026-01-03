import { fontStyles, vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  position: 'relative', 
  fontFamily: 'system-ui, -apple-system, sans-serif',
  zIndex: 10,
});

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '4px 8px',
  cursor: 'pointer',
  backgroundColor: vars.colors.grayscale5,
  border: `1px solid ${vars.colors.grayscale10}`,
  borderRadius: '28px',
  
  width: '100%',
  transition: 'background-color 0.2s, border-color 0.2s',

  selectors: {
    '&[aria-expanded="true"]': {
      backgroundColor: vars.colors.primary40, 
    },
    '&:disabled': {
      cursor: 'default',
      opacity: 1,
      pointerEvents: 'none',
      backgroundColor: vars.colors.grayscale5, 
    },
  },
});

export const headerContent = style({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const avatarWrapper = style({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
});

export const countBadge = style({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  backgroundColor: vars.colors.grayscale10,
  color: vars.colors.grayscale40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px solid ${vars.colors.grayscale20}`,
  marginLeft: '-12px',
  zIndex: 1,
  flexShrink: 0,
  ...fontStyles.md2_text_medium
});

export const nameText = style({
  color: vars.colors.grayscale50,
  ...fontStyles.md2_text_medium
});

export const arrow = style({
  color: vars.colors.grayscale50,
  transition : 'all 0.3s ease-in-out',
});

export const chevronOpen = style({
  transform: 'rotate(180deg)',
  transition : 'all 0.3s ease-in-out',
  color: vars.colors.white,
});

export const listContainer = style({
  position: 'absolute',
  top: 'calc(100% + 8px)',
  minWidth: '143px',
  width: 'max-content', 
  right: 0, 
  
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.grayscale10}`,
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  maxHeight: '300px',
  overflowY: 'auto',
  zIndex: 20,
  padding: '4px',
  gap: '12px'
});

export const listItem = style({
  transition : 'all 0.3s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  padding: '6px 24px 6px 16px',
  border: 'none',
  borderRadius: '10px',
  background: 'transparent',
  cursor: 'pointer',
  textAlign: 'left',
  gap: '12px',
      color: vars.colors.grayscale50,
  ':hover': {
    backgroundColor: vars.colors.primary5,
    color: vars.colors.primary50
  },
  ...fontStyles.md2_text_medium
});


export const listTitle = style({
  padding: '8px 12px 0 12px',
})