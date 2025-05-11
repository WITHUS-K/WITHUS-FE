import { fontStyles, vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const container = style({
  width: '100%',
  padding: '5.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '10rem',
  justifyContent: 'center',
  alignItems: 'flex-start',
  borderRadius: '24px',
  border:`1px solid ${vars.colors.grayscale5}`,
  backgroundColor: vars.colors.white
})

export const title = style({
  width: '100%',
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  alignSelf: 'center',
  color: vars.colors.black,
  ...fontStyles.xxl_title_bold
})

export const headerWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '2rem',
  border: `1px solid ${vars.colors.grayscale5}`,
  borderRadius: '16px',
  background: vars.colors.bg,
  gap: '1rem',
});

export const item = style({
  flex: 1,
  textAlign: 'center',
  gap: '0.8rem'
});

export const imageContainer = style({
  position: 'relative',      
  width: '15.6rem',
  height: '20.8rem',
  flexShrink: 0,   
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '12px',
  border: `1px solid ${vars.colors.grayscale10}`,
  backgroundColor: vars.colors.grayscale5,
  cursor: 'pointer',
})

export const questionRow = style({
  position: 'relative',
});

export const fieldWrapper = style({
  width: '100%',
});

export const removeButton = style({
  all: 'unset',
  position: 'absolute',
  right: '1.5rem',
  top: '54%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
});
