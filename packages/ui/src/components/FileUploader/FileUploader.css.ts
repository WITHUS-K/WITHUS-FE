import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const pdfIcon = style({
    padding: '1rem 0.7rem',
    borderRadius: '8px',
    backgroundColor: vars.colors.grayscale5
});

export const downloadButton = style({
  all: 'unset',
  cursor: 'pointer',
  height: '3.2rem',
  display: 'flex',
  gap: '0.8rem',
  padding: '0 1.6rem',
  justifyContent: 'center',
  alignItems:'center',
  borderRadius: '8px',
  backgroundColor: vars.colors.grayscale10,
  color: vars.colors.white,
  transition: 'all 0.2s ease-in-out',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.grayscale20,
    },
  },
});

export const rightSection = style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.8rem',
  });