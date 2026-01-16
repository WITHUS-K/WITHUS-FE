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

export const titleWrap = style({
    display:'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    width: '100%'
})

export const listContainer = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.6rem',
    padding: '1.6rem',
    backgroundColor: vars.colors.white,
    borderRadius: '16px'
})

export const iconColor = style({
    color: vars.colors.grayscale40,

})