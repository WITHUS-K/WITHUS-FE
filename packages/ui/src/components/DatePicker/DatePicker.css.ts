import { style, styleVariants } from '@vanilla-extract/css';
import { colors, fontStyles } from '@repo/theme';

export const wrapper = style({
  width: '34.8rem',
  backgroundColor: colors.white,
  borderRadius: '12px',
  padding: '2.7rem',
  userSelect: 'none',
  position: 'relative',
  overflow: 'scroll',
});

export const shadow = style({
  boxShadow: '0px 0px 20px 0px rgba(0, 0, 0, 0.10)',

})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '29.4rem',
  height: '4.5rem',
  margin: '0 auto',
  zIndex: 1,
});

export const navLeftButton = style({
  all: 'unset',
  display: 'flex',
  cursor: 'pointer',
  padding: '0.712rem',
  borderRadius: '18px',
  marginRight: '4.2rem',
  color: colors.grayscale20,
  transition: 'all 0.2s ease-in-out',
  selectors: {
    '&:hover': {
      backgroundColor: colors.grayscale5,
      color: colors.grayscale60,
    },
  },
});

export const navRightButton = style({
  all: 'unset',
  display: 'flex',
  cursor: 'pointer',
  padding: '0.712rem',
  borderRadius: '18px',
  marginLeft: '2.45rem',
  color: colors.grayscale20,
  transition: 'all 0.2s ease-in-out',
  selectors: {
    '&:hover': {
      backgroundColor: colors.grayscale5,
      color: colors.grayscale60,
    },
  },
});

export const monthSelectWrapper = style({
  display: 'inline-block',
});

export const monthSelect = style({
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  padding: '0.4rem 0.8rem',
  cursor: 'pointer',
  gap: '0.1rem',
  transition: 'all 0.2s ease-in-out',
  selectors: {
    '&:hover': {
      backgroundColor: colors.grayscale5,
    },
  },
  ...fontStyles.lg_subtitle_semibold,
  color: colors.grayscale90,
  fontSize: '1rem',
});

export const dropdownFull = style({
  position: 'absolute',
  top: '7.6rem',
  left: 0,
  width: '34.8rem',
  height: '29rem',
  backgroundColor: colors.white,
  borderRadius: '12px',
  zIndex: 20,
  msOverflowStyle: 'none',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  padding: '0 2.7rem',
});

export const arrowStyle = styleVariants({
  open: {
    transform: 'rotate(180deg)',
    transition: 'transform 0.2s ease',
  },
  closed: {
    transform: 'rotate(0deg)',
    transition: 'transform 0.2s ease',
  },
});

export const dropdownList = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  marginTop: '1rem',
});

export const dropdownItem = style({
  width: '100%',
  height: '4.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '8px',
  padding: '0 6.6rem',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  selectors: {
    '&:hover': {
      backgroundColor: colors.grayscale5,
    },
  },
  ...fontStyles.md1_text_medium,
});

export const dropdownItemVariants = styleVariants({
  selected: {
    backgroundColor: colors.primary5,
    color: colors.primary50,
    ...fontStyles.md1_text_semibold,
  },
  unselected: {
    backgroundColor: 'transparent',
    color: colors.grayscale50,
  },
});

export const calendar = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gridAutoRows: '45px',
  textAlign: 'center',
  rowGap: '0.319rem',
  marginTop: '1rem',
});

export const dayName = style({
  ...fontStyles.md2_text_medium,
  color: colors.grayscale90,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
export const dayNameVariants = styleVariants({
  sunday: { color: colors.error },
});

export const dayCell = style({
  width: '4.2rem',
  height: '4.2rem',
  borderRadius: '50%',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...fontStyles.md2_text_medium,
  transition: 'background-color 0.2s, color 0.2s',
});

export const dayVariants = styleVariants({
  disabled: {
    color: colors.grayscale20,
    cursor: 'default',
  },
  today: {
    color: colors.primary50,
    selectors: {
      '&:hover': {
        backgroundColor: colors.grayscale5,
      },
    },
  },
  selected: {
    backgroundColor: colors.primary50,
    color: colors.white,
  },
  normal: {
    color: colors.grayscale90,
    selectors: {
      '&:hover': {
        backgroundColor: colors.grayscale5,
      },
    },
  },
  sunday: { color: colors.error },
});

export const dropdownSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  marginTop: '1.6rem',
});

export const sectionTitle = style({
  ...fontStyles.md1_text_semibold,
  color: colors.grayscale60,
  marginBottom: '0.8rem',
});

export const yearSelect = style({
  all: 'unset',
  appearance: 'none',
  padding: '0.4rem 0.8rem',
  borderRadius: 8,
  cursor: 'pointer',
  ...fontStyles.lg_subtitle_semibold,
  color: colors.grayscale90,
  fontSize: '1rem',
  selectors: {
    '&:hover': {
      backgroundColor: colors.grayscale5,
    },
  },
});

export const monthOnlySelect = style({
  all: 'unset',
  appearance: 'none',
  padding: '0.4rem 0.8rem',
  borderRadius: 8,
  cursor: 'pointer',
  ...fontStyles.lg_subtitle_semibold,
  color: colors.grayscale90,
  fontSize: '1rem',
  selectors: {
    '&:hover': {
      backgroundColor: colors.grayscale5,
    },
  },
});

export const birthDropdownFull = style({
  position: 'absolute',
  top: 0,           
  left: 0,
  width: '100%',     
  height: '100%',
  backgroundColor: colors.white,
  borderRadius: '12px',
  boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.1)',
  zIndex: 20,
  display: 'flex',
  flexDirection: 'column',
  padding: '2.7rem',
  overflow: 'hidden',        
});

export const birthDropdownHeader = style({
  flex: '0 0 auto',
  ...fontStyles.xl_title_bold,
  color: colors.grayscale90,
  textAlign: 'center',
  marginBottom: '1.6rem',
});

export const birthDropdownBody = style({
  flex: '1 1 auto',
  overflowY: 'auto',
  width: '30.2rem',
  height: '20.4rem',
});

export const birthGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  columnGap: '1.6rem',
  rowGap: '0.8rem',
});

export const birthCell = style({
  ...fontStyles.md1_text_medium,
  color: colors.grayscale50,
  textAlign: 'center',
  padding: '0.8rem 0',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  selectors: {
    '&:hover': {
      backgroundColor: colors.grayscale5,
    },
  },
});

export const yearCellVariants = styleVariants({
  selected: {
    ...fontStyles.md1_text_semibold,
    backgroundColor: colors.primary5,
    color: colors.primary50,
  },
  unselected: {},
});

export const dropdownFooter = style({
  flex: '0 0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '4.8rem',
  gap: '0.8rem'
});