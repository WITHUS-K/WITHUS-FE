import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const container = style({
  display: 'flex',
  backgroundColor: vars.colors.white,
  borderRadius: '24px',
  border: `1px solid ${vars.colors.grayscale5}`,
  padding: '5.2rem',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '10rem',
  flexDirection: 'column',
});

export const layout = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  paddingTop: '2.4rem',
  paddingBottom: '6rem',
});

export const headerWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '2rem',
  border: `1px solid ${vars.colors.grayscale5}`,
  borderRadius: '16px',
  background: vars.colors.bg,
  gap: '1rem',
});

export const item = style({
  flex: 1,
  textAlign: 'center',
  gap: '0.8rem',
});

export const saveButton = style({
  display: 'flex',
  alignSelf: 'center',
  marginTop: '2.4rem',
});
