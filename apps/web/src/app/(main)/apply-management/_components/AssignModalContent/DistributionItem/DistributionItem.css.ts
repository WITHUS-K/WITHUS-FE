import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const paddingStyle = style({
  padding: '0.8rem 1.2rem',
});

export const itemStyle = style({
  display: 'flex',
  padding: '0.8rem 1.2rem',
  width: '100%',
  alignItems: 'center',
  gap: '2.4rem',
  flexDirection: 'row',
});
