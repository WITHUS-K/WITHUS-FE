import { colors, fontStyles, vars } from "@repo/theme";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const tooltipWrapper = style({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  cursor: 'pointer',
  color: vars.colors.grayscale30,
});

export const tooltipBalloon = recipe({
  base: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '0.476rem 0.8rem 0.524rem 0.8rem',
    backgroundColor: colors.grayscale70, 
    color: colors.white,
    borderRadius: '6px',
    whiteSpace: 'nowrap',
    zIndex: 100,
    ...fontStyles.xs_caption_semibold,
  },
  variants: {
    position: {
      top: { bottom: 'calc(100% + 1.6rem)' },
      bottom: { top: 'calc(100% + 1.6rem)' },
    },
  },
});

export const tooltipArrow = recipe({
  base: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '0',
    height: '0',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
  },
  variants: {
    position: {
      top: {
        bottom: '-5px',
        borderTop: `5px solid ${colors.grayscale70}`,
      },
      bottom: {
        top: '-5px',
        borderBottom: `5px solid ${colors.grayscale70}`,
      },
    },
  },
});