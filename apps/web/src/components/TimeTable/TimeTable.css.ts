import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const root = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

export const headerRow = style({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
});

export const headerSpacer = style({
  width: '5.5rem',
});

export const timeLabel = style({
  height: '4.15rem',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
  marginRight: '2rem',
  ...fontStyles.md2_text_medium,
  color: vars.colors.grayscale50,
});

export const cellsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  backgroundColor: vars.colors.white,
  borderRadius: '12px',
  border: `1px solid ${vars.colors.grayscale20}`,
  overflow: 'hidden',
  alignSelf: 'flex-start',
});

export const cell = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  height: '4.2rem',

  borderBottom: `1px solid ${vars.colors.grayscale20}`,
});

export const dotted = style({
  borderBottom: `1px dotted ${vars.colors.grayscale20}`,
});

export const lastRow = style({
  borderBottom: 'none',
});

export const cellWrapper = style({
  width: '100%',
  height: '100%',
});

export const selected = style({
  backgroundColor: vars.colors.primary20,
});

export const unavailable = style({
  backgroundColor: vars.colors.grayscale10,
  pointerEvents: 'none',
  cursor: 'not-allowed',
});

export const selectedDotted = style({
  backgroundColor: vars.colors.primary20,
  borderBottom: `1px dotted ${vars.colors.primary40}`,
});

export const selectedSolid = style({
  backgroundColor: vars.colors.primary20,
  borderBottom: `1px solid ${vars.colors.primary40}`,
});

export const unavailableDotted = style({
  backgroundColor: vars.colors.grayscale10,
  pointerEvents: 'none',
  cursor: 'not-allowed',
  borderBottom: `1px dotted ${vars.colors.grayscale20}`,
});

export const unavailableSolid = style({
  backgroundColor: vars.colors.grayscale10,
  pointerEvents: 'none',
  cursor: 'not-allowed',
  borderBottom: `1px solid ${vars.colors.grayscale20}`,
});

export const noBorder = style({
  borderBottom: 'none',
});
