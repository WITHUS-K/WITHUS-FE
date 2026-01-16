import { vars } from "@repo/theme";
import { style } from "@vanilla-extract/css";

export const container = style({
    width: '37.1rem',
    padding: '3.2rem',
    borderRadius: '24px',
    border: `1px solid ${vars.colors.grayscale5}`,
    background:vars.colors.grayscale5,
    display: 'flex',
    flexDirection: 'column',
    gap: '2.4rem',
    alignContent: 'start'
})

export const iconColor = style({
    color : vars.colors.grayscale30,
    cursor:'pointer',
    marginTop: '0.1rem'
})