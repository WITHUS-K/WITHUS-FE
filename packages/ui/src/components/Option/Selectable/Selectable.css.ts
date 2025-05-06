import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@repo/theme';

export const selectable = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '1.6rem',
    borderRadius: '12px',
    border: `1px solid ${vars.colors.grayscale20}`,
    cursor: 'pointer',
    transition: 'border-color 0.2s, background-color 0.2s, color 0.2s',
    userSelect: 'none',
    paddingBlock: 0,
    paddingInline: 0,
    color: vars.colors.grayscale20,
    backgroundColor: vars.colors.white,
  },
  variants: {
    isSelected: {
      true: {
        borderColor: vars.colors.primary50,
        color: vars.colors.primary50,
      },
      false: {},
    },
    disableHover: {
      true: {},
      false: {
        selectors: {
          '&:hover': {
            color: vars.colors.primary50,
            borderColor: vars.colors.primary50,
          },
        },
      },
    },
  },
  defaultVariants: {
    isSelected: false,
    disableHover: false,
  },
});
