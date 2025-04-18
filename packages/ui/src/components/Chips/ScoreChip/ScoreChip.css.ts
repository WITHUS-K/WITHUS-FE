import { style } from '@vanilla-extract/css';
import { colors, fontStyles } from '@repo/theme';

export const listWrapper = style({
  display: 'inline-flex',
  alignItems: 'center',

  gap: '1.6rem',              
  backgroundColor: colors.grayscale5,
  borderRadius: '8px',
  padding: '0.6rem 1.2rem',
});

export const itemWrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.2rem',            
});

export const itemProfileWrapper = style({
  display: 'inline-flex',
  alignItems: 'center',

  gap: '0.8rem',     
})

export const separator = style({
  width: 0,                        
  height: '1.5rem',                 
  borderLeft: `1px solid ${colors.grayscale90}`,
});
