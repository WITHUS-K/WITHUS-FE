import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  width: '100%',
});

export const header = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',
});

export const bodyContainer = style({
  width: '100%',
  border: `1px solid ${vars.colors.grayscale20}`,
  borderRadius: '16px',
  padding: '1.6rem',
  selectors: {
    '&[data-read-only="true"]': {
      backgroundColor: vars.colors.bg,
      border: `1px solid ${vars.colors.grayscale5}`,
    },
  },
})


export const dropZone = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.6rem',
  cursor: 'pointer',
  border: `1px dashed ${vars.colors.grayscale10}`,
  borderRadius: '16px',
  padding: '6.55rem 0',
  marginTop: '1.6rem'
});

export const input = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
});

export const commentDivider = style({
    width: '100%',
    borderTop: `1px dashed ${vars.colors.grayscale10}`
  })
  