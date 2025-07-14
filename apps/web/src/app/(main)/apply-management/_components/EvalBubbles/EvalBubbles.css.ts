import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const wrapper = style({
  position: 'relative',
  display: 'inline-block',
  verticalAlign: 'middle',
  fontSize: 0,
});

export const bubble = style({
  position: 'absolute',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 0 0 1px ${vars.colors.white}`,
  cursor: 'pointer',
  ...fontStyles.sm_caption_medium,
});
