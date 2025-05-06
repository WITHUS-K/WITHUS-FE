// components/StageTab/stageTab.css.ts
import { style, styleVariants } from '@vanilla-extract/css';
import { vars, fontStyles } from '@repo/theme';

export const container = style({
  display: 'flex',
  gap: '2.4rem',
  width: '100%',
});

// ── LEFT PANEL ─────────────────────────────────────────────────────────────────
export const left = style({
  width: '37.1rem',
  padding: '2rem',
  background: vars.colors.grayscale5,
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6.4rem',
});

export const dateChip = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '5.6rem',
  padding: '1.6rem',
  borderRadius: '12px',
  border: `1px solid ${vars.colors.grayscale20}`,
  background: vars.colors.white,
  color: vars.colors.grayscale70,
  cursor: 'pointer',
  ...fontStyles.md2_text_regular,
  selectors: {
    '&:disabled': {
      borderColor: vars.colors.grayscale20,
      background: vars.colors.grayscale5,
      color: vars.colors.grayscale10,
      cursor: 'not-allowed',
    },
  },
});

export const dateChipSelected = style({
  borderColor: vars.colors.primary50,
  color: vars.colors.primary50,
});

export const timeList = style({
  padding: '1.2rem',
  border: `1px solid ${vars.colors.grayscale20}`,
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
});

export const scheduleContainer = style({
  display: 'flex',
  border: `1px solid ${vars.colors.grayscale20}`,
  padding: '1.2rem',
  borderRadius: '12px',
  flexDirection: 'column',
  width: '100%',
});

// **시작/종료 시간 박스**
export const timeBox = style({
  flex: 1,
  width: '13.75rem',
  height: '4.4rem',
  border: `1px solid ${vars.colors.grayscale20}`,
  borderRadius: '12px',
  display: 'flex',
  alignItems: 'flex-start',
  padding: '1rem 1.6rem',
  background: vars.colors.white,
  color: vars.colors.grayscale70,
  ...fontStyles.md2_text_medium,
  selectors: {
    '&::placeholder': {
      color: vars.colors.grayscale40,
    },
  },
});

// **비활성화된 박스**
export const timeBoxDisabled = style({
  background: vars.colors.grayscale5,
  color: vars.colors.grayscale10,
  selectors: {
    '&::placeholder': {
      color: vars.colors.grayscale10,
    },
  },
  cursor: 'not-allowed',
});

// ── RIGHT PANEL ────────────────────────────────────────────────────────────────
export const right = style({
  flex: 1,
  padding: '2.3rem',
  background: vars.colors.grayscale5,
  borderRadius: '22px',
  display: 'flex',
  minHeight: '48.2rem',
  alignItems: 'center',
  justifyContent: 'center',
});

export const timescroll = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  height: '35.5rem',
  overflowY: 'auto',
  gap: '1.6rem',

  selectors: {
    '&::-webkit-scrollbar': {
      width: '2px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: vars.colors.grayscale10,
      borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
  },
});
