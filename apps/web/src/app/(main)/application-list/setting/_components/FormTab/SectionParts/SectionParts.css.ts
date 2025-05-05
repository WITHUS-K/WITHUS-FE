// app/application-list/setting/sections/SectionParts.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';
import { fontStyles } from '@repo/theme';

// 파트 태그 기본 스타일
export const tag = style({
  width: '21.2rem',
  height: '5.6rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.6rem',
  borderRadius: '12px',
  border: `1px solid ${vars.colors.grayscale20}`,
  background: vars.colors.white,
  color: vars.colors.grayscale90,
  cursor: 'pointer',
  ...fontStyles.md2_text_regular,
});

// 파트 태그 비활성화 스타일
export const tagDisabled = style({
  background: vars.colors.grayscale5,
  color: vars.colors.grayscale20,
  cursor: 'default',
});

// 추가 버튼 스타일
// **비활성화된** 추가 버튼
export const addButtonDisabled = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '21.2rem',
  height: '5.6rem',
  borderRadius: '12px',
  border: 'none',
  background: vars.colors.grayscale5,
  color: vars.colors.grayscale20,
  cursor: 'not-allowed',
});

// **활성화된** 추가 버튼
export const addButtonEnabled = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '21.2rem',
  height: '5.6rem',
  borderRadius: '12px',
  border: 'none',
  background: vars.colors.primary5,
  color: vars.colors.primary50,
  cursor: 'pointer',
});

// 입력 컨테이너 스타일
export const inputContainer = style({
  width: '21.2rem',
  height: '5.6rem',
  display: 'flex',
  padding: '1.6rem',
  border: `1px solid ${vars.colors.primary50}`,
  borderRadius: '12px',
  background: vars.colors.white,
});

// 입력 필드 스타일
export const input = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: vars.colors.grayscale90,

  '::placeholder': {
    color: vars.colors.grayscale40,
  },
  ...fontStyles.md2_text_regular,
});
