import { fontStyles, vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  padding: '2rem',
  borderRadius: '24px',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.grayscale5}`
})

export const detailWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
});

export const title  = style({
  width: '100%',
  color: vars.colors.grayscale90,
  ...fontStyles.md1_text_semibold
})

export const announcementContainer = style({
  gap: '0.5rem', 
  height: '16.7rem'
})

export const docsContainer = style({
  gap: '0.5rem', 
  height: '38rem'
})

export const header = style({
  display: 'flex',
  justifyContent:'space-between',
  alignItems: 'center',
});