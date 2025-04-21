import { style, styleVariants } from '@vanilla-extract/css';
import { fontStyles } from '@repo/theme';
import { vars } from '@repo/theme';

export const progressBarContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const progressVisuals = style({
  display: 'flex',
  alignItems: 'center',
});

export const visualItem = style({
  display: 'flex',
  alignItems: 'center',
});

export const circleBase = style({
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...fontStyles.sm_caption_semibold,
});

export const circleVariants = styleVariants({
  completed: {
    backgroundColor: vars.colors.primary50,
    color: vars.colors.white,
  },
  active: {
    backgroundColor: vars.colors.primary50,
    color: vars.colors.white,
  },
  upcoming: {
    backgroundColor: vars.colors.grayscale30,
    color: vars.colors.white,
  },
});

export const progressLabels = style({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '0.8rem',
});

export const labelItem = style({
  ...fontStyles.sm_caption_medium,
  whiteSpace: 'nowrap',
  selectors: {
    [`${progressLabels} > &:nth-child(1)`]: {
      marginRight: '5.4rem',
    },
    [`${progressLabels} > &:nth-child(2)`]: {
      marginRight: '6.8rem',
    },
    [`${progressLabels} > &:nth-child(3)`]: {
      marginRight: '6.6rem',
    },
    [`${progressLabels} > &:nth-child(4)`]: {
      marginRight: '1.3rem',
    },
  },
});

export const labelVariants = styleVariants({
  completed: { color: vars.colors.primary50 },
  active: { color: vars.colors.primary50 },
  upcoming: { color: vars.colors.grayscale30 },
});

export const connectorLineBase = style({
  display: 'flex',
  width: '10rem',
  height: '1px',
});

export const connectorLineVariants = styleVariants({
  completed: {
    borderTop: `2px dashed ${vars.colors.primary50}`,
  },
  upcoming: {
    borderTop: `2px dashed ${vars.colors.grayscale30}`,
  },
});
