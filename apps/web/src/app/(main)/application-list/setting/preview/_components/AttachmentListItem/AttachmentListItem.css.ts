import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const wrapper = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '12px',
  padding: '1.6rem',
  backgroundColor: vars.colors.white,
  border: `1px solid ${vars.colors.grayscale10}`,
});

export const icon = style({
  width: '4.2rem',
  height: '4.2rem',
  borderRadius: '8px',
  backgroundColor: vars.colors.grayscale5,
  color: vars.colors.grayscale40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...fontStyles.sm_caption_medium,
});
