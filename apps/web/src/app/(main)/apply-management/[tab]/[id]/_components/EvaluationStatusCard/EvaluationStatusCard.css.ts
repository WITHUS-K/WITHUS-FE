import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const card = style({
  border: `1px solid ${vars.colors.grayscale10}`,
  borderRadius: '16px',
  width: '100%',
  overflow: 'hidden'
});

export const waiting = style({
  background: vars.colors.bg,
})

export const complete = style({
  background: vars.colors.white,

})

export const row = style({
  display: 'flex',
  alignItems: 'center',
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `1px solid ${vars.colors.grayscale10}`,
    },
  },
});

export const stack = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',  
  alignItems: 'center',   
});

export const rowLeftSide = style({
  display: 'flex',
  gap: '0.8rem',
  borderRight: `1px solid ${vars.colors.grayscale10}`,
  padding: '1.2rem 0',
  width: '9rem',
  height: '100%',
  justifyContent: 'center',  
  alignItems: 'center',   
    flexShrink: 0,
})
