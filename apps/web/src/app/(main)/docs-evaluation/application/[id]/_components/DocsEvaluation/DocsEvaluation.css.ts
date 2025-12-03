import { vars } from "@repo/theme";
import { style } from "@vanilla-extract/css";

export const container = style({
    padding: '3.2rem',
    backgroundColor: vars.colors.white,
    borderRadius: '24px',
    width: '100%'
})

export const evaluationItem = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    width: '100%',
})

export const scoreContainer = style({
    borderRadius: '12px',
    width: '100%',
    padding: '1.6rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: vars.colors.primary5
})

export const tagStyle = style({
    padding: '0.6rem 0.8rem',
    borderRadius: '8px',
    backgroundColor: vars.colors.white,
})

export const levelsWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '1.6rem',
    width: '100%',
})

export const finalScoreWrapper = style({
    position: 'fixed',
    bottom: 0, 
    right: 0,
    width: 'calc(100vw - 240px)', 
    zIndex: 10, 
    backgroundColor: vars.colors.white,
    borderTop: `1px solid ${vars.colors.grayscale10}`,
    padding: '2rem 4rem 2rem 2rem',
    display:'flex',
    gap: '4rem',
    alignContent: 'center',
    alignItems: 'center'
})