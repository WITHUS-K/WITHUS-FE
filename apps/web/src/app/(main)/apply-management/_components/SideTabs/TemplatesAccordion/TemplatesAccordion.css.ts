import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const accordion = style({
  border: `1px solid ${vars.colors.grayscale10}`,
  padding: '0.6rem',
  borderRadius: '12px',
  background: vars.colors.white,
});

export const header = style({
  width: '100%',
  padding: '0.6rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
});

export const rotated = style({
  transform: 'rotate(-180deg)',
});

export const body = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
  marginTop: '0.6rem',
});


export const newInput = style({
  width: '16.667rem',
  height: '3.2rem',
  borderRadius: '8px',
  backgroundColor: vars.colors.primary5,
  color: vars.colors.primary50,
  ...fontStyles.sm_caption_medium,
  textAlign: 'center',
  border: 'none',
  outline: 'none',
});


export const templateItem = style({
  position: 'relative',
  display: 'inline-block',
});

export const moreButton = style({
  position: 'absolute',
  top: '50%',
  right: '0.8rem',
  transform: 'translateY(-50%)',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  padding: 0,
  opacity: 0,
  transition: 'opacity 0.15s ease-in-out',
  color : vars.colors.primary50,

  // 부모(templateItem)가 hover일 때 이 버튼(moreButton)만 상태 변경
  selectors: {
    [`${templateItem}:hover &`]: {
      opacity: 1,
    },
  },
});


export const moreMenu = style({
  position: 'absolute',
  top: '3.6rem',
  right: 0,
  width: '8.8rem',
  borderRadius: '12px',
  backgroundColor: 'white',
  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
  overflow: 'hidden',
  zIndex: 10,
  padding: '0.4rem',
  display:'flex',
  flexDirection : 'column',
  gap:'0.4rem'
});

export const moreMenuItem = style({
  width: '100%',
  padding: '0.4rem 2.75rem',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius:'10px',
  border: 'none',
  background: 'white',
  selectors: {
    '&:hover': {
      background: '#F2F4FF', // 디자인에 맞게 수정
    },
  },
});


export const list = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '0.8rem',
});


export const moreButtonSelected = style({
  color: vars.colors.white,
});