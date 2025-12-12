import { fontStyles, vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const root = style({});

export const selectedArea = style({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '1.2rem',
  marginBottom: '1.2rem',
});

export const tagWrap = style({
  flex: 1,
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.8rem',
  maxHeight: '8.4rem',
  overflowY: 'auto',
  paddingBottom: '0.4rem',
  minHeight : '3rem',
  borderBottom: `1px solid ${vars.colors.grayscale10}`,
});

export const tag = style({
    padding: '0rem 0.8rem',
    borderRadius: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    ...fontStyles.sm_caption_medium,
    color: vars.colors.grayscale70,
    border: `1px solid ${vars.colors.grayscale10}`,
  });

export const tagX = style({
  marginLeft: '0.6rem',
  opacity: 0.6,
});

export const searchRow = style({
  marginBottom: '1.2rem',
});

export const list = style({
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid #F1F5F9',
});

export const resultRow = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.2rem 1.6rem',
  background: '#fff',
  borderBottom: '1px solid #F1F5F9',
  cursor: 'pointer',
  selectors: {
    '&:disabled': { cursor: 'default', opacity: 0.6 },
    '&:last-child': { borderBottom: 'none' },
  },
});

export const selectedList = style({
  marginTop: '1.2rem',
  height : '20rem'
});


export const item = style({
    backgroundColor: vars.colors.white,
    borderRadius: '8px',
    padding: '0.4rem 0.8rem',
    selectors: {
      '&:hover': { backgroundColor: vars.colors.grayscale5 },
    },
  });
  
  export const button = style({
    color: vars.colors.grayscale20,
    selectors: {
      [`${item}:hover &`]: {
        color: vars.colors.grayscale50,
      },
    },
  });
  