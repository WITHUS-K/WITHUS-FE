import { vars } from "@repo/theme";
import { style } from "@vanilla-extract/css";

export const cardWrapper = style({
  padding: '2rem',
  border:  `1px solid ${vars.colors.grayscale5}`,
  backgroundColor: vars.colors.white,
  borderRadius: '16px',
  display: 'flex',
  width: '100%',
  alignItems: 'flex-start',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  selectors: {
    '&:hover': { 
      border:  `1px solid ${vars.colors.grayscale10}`,
      boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.08)',
    },
  },
}) 

export const iconButton = style({
  color: vars.colors.grayscale20,
  backgroundColor: 'transparent',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  selectors: {
    '&:hover': { 
      backgroundColor: vars.colors.grayscale5,
      color: vars.colors.grayscale40 
    },
  },
})