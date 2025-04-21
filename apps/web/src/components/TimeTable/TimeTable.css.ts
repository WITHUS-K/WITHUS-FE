import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: vars.colors.white,
});

export const headerRow = style({
  display: 'grid',
  borderBottom: `1px solid ${vars.colors.grayscale20}`,
});

export const headerCell = style({
  textAlign: 'center',
});

export const grid = style({
  display: 'grid',
  // 1칸 높이를 42px로 고정
  gridAutoRows: '42px',
});

export const cell = style({
  position: 'relative',
  // 기본은 점선
  borderBottom: `1px dotted ${vars.colors.grayscale30}`,
});

export const fullHourCell = style({
  // 1시간 간격은 실선
  borderBottom: `1px solid ${vars.colors.grayscale20}`,
});

export const timeLabel = style({
  position: 'absolute',
  left: 0,
  top: 0,
  padding: '0.25rem',
});

export const cellContent = style({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // gridAutoRows 와 동일하게
  height: '42px',
});
