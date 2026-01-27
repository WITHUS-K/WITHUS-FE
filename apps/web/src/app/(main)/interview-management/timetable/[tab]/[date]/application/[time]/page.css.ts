import { vars } from "@repo/theme";
import { style } from "@vanilla-extract/css";

export const pageContainer = style({
    width: '100%'
})


export const container1 = style({
    width: '100%',
    backgroundColor: vars.colors.bg,
    display: 'flex',
    //gap: '4rem',
    flexDirection: 'column',
  });
  
  export const rightSection = style({
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  });
  