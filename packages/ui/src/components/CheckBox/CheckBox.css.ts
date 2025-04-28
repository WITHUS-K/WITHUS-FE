import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme'; // 혹은 @seoulmilk/theme 등 사용 중인 테마 import 경로

export const wrapperStyle = style({
  position: 'relative',
  display: 'inline-block',
  color: vars.colors.white,
});

export const inputStyle = style({
  appearance: 'none',
  width: '100%',
  height: '100%',
  borderRadius: '5.33px',
  backgroundColor: vars.colors.grayscale10,
  flexShrink: 0,
  cursor: 'pointer',
  position: 'relative',

  selectors: {
    '&:checked': {
      backgroundColor: vars.colors.primary50,
    },
  },
});

export const iconStyle = style({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  pointerEvents: 'none',
});
