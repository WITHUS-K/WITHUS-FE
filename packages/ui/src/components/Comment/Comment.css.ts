import { fontStyles, vars } from "@repo/theme";
import { style } from "@vanilla-extract/css";

export const comment = style({
    width: '100%',
    padding: '1.2rem 1.6rem',
    borderRadius: '8px',
    backgroundColor: vars.colors.grayscale5,
    ...fontStyles.md2_text_regular
})