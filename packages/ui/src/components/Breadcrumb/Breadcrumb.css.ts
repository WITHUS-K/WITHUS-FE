import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const breadcrumbStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem', // vars.space[2] 로도 대체 가능
});
