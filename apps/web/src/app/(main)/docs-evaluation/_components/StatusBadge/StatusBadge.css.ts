import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const badge = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '0.65rem 0.8rem',
  borderRadius: '8px',
  ...fontStyles.sm_caption_medium,
});

export const badgeVariants = styleVariants({
  default: {
    background: vars.colors.grayscale5,
    color: vars.colors.grayscale50,
  },
  success: {
    background: vars.colors.primary5,
    color: vars.colors.primary50,
  },
  danger: {
    background: '#FFE6E9',
    color: '#FF2A3A',
  },
});
