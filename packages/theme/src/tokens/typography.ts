export const typography = {
  fontSize: {
    28: "2.8rem",
    24: "2.4rem",
    20: "2rem",
    18: "1.8rem",
    16: "1.6rem",
    14: "1.4rem",
    12: "1.2rem",
  },
  fontWeight: {
    bold: "700",
    semibold: "600",
    medium: "500",
    regular: "400",
  },
} as const;

export type TypographyType = typeof typography;
