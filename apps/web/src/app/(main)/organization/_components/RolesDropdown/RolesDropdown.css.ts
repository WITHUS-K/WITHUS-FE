import { vars } from '@repo/theme';
import { style, styleVariants } from '@vanilla-extract/css';

export const buttonStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.6rem',
  height: '2.6rem',
  borderRadius: '8px',
  color: vars.colors.primary20,
  border: `1px solid ${vars.colors.primary20}`,
  backgroundColor: vars.colors.white,

  selectors: {
    '&:active': {
      color: vars.colors.primary50,
      border: `1px solid ${vars.colors.primary50}`,
      backgroundColor: vars.colors.primary5,
    },
  },
});
