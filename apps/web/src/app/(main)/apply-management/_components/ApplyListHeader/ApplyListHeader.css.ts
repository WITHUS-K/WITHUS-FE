import { style } from '@vanilla-extract/css';
import { vars, fontStyles } from '@repo/theme';

export const row = style({
  display: 'flex',
  alignItems: 'center',
  height: '4rem',
  width: '100%',
  borderBottom: `1px solid ${vars.colors.grayscale10}`,
  paddingInline: '1.2rem',
  ...fontStyles.xs_caption_medium,
  color: vars.colors.grayscale40,
});
export const cell = style({ display: 'flex', alignItems: 'center' });
export const labelWrap = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});
