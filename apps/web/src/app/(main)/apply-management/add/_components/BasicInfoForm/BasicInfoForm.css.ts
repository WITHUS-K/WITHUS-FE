import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
});

export const gender = style({
  textAlign: 'center',
  width: '11.9rem',
});

export const header = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '2.4rem',
  width: '100%',
});

export const contentColumn = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  width: '100%',
});

export const row = style({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.6rem',
  alignItems: 'center',
  width: '100%',
});

export const rowItem = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1.6rem',
  width: '100%',
});

export const fieldWrapper = style({
  flex: 1,
  width: '100%',
});

export const optionWrapper = style({
  display: 'flex',
  gap: '0.8rem',
  flex: '0 0 auto',
  width: '100%',
});

export const imageContainerBase = style({
  position: 'relative',
  width: '15.6rem',
  height: '20.8rem',
  flexShrink: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '12px',
  border: `1px solid ${vars.colors.grayscale10}`,
  backgroundColor: vars.colors.white,
  cursor: 'pointer',
  transition: 'border-color 0.2s',
});

// empty: 파일 없을 때, hover 시 primary50
// filled: 파일 있을 때, hover 시 grayscale10
export const imageContainer = styleVariants({
  empty: [
    imageContainerBase,
    { selectors: { '&:hover': { borderColor: vars.colors.primary50 } } },
  ],
  filled: [
    imageContainerBase,
    { selectors: { '&:hover': { borderColor: vars.colors.grayscale10 } } },
  ],
});

export const reuploadOverlay = style({
  position: 'absolute',
  inset: 0,
  borderRadius: '12px',

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: vars.colors.white,
  pointerEvents: 'none',
  opacity: 0,
  transition: 'opacity 0.2s',
  borderColor: vars.colors.grayscale20,
  ...fontStyles.md2_text_medium,

  selectors: {
    // imageContainer 호버 시 보이게
    [`${imageContainer.filled}:hover &`]: {
      opacity: 1,
    },
  },
});

export const imageInput = style({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
  zIndex: 2,
});

export const imagePreview = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '12px',

  selectors: {
    //  호버 시 블러 처리
    [`${imageContainer.filled}:hover &`]: {
      filter: 'blur(2px)',
    },
  },
});
