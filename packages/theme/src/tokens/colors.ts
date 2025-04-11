export const colors = {
  //primary
  primary5: "#E0E7FF",
  primary10: "#BECEFF",
  primary20: "#9EB6FF",
  primary30: "#7294FF",
  primary40: "#5680FF",
  primary50: "#2C60FF",
  primary60: "#2857E8",
  primary70: "#1F44B5",
  primary80: "#18358C",
  primary90: "#12286B",

  //grayscale
  grayscale5: "#F2F3F6",
  grayscale10: "#D7D8E2",
  grayscale20: "#C4C6D4",
  grayscale30: "#A9ABC0",
  grayscale40: "#999BB4",
  grayscale50: "#7F82A1",
  grayscale60: "#747693",
  grayscale70: "#5A5C72",
  grayscale80: "#464859",
  grayscale90: "#353744",

  //white & black
  white: "#FFFFFF",
  black: "#121212",

  //mint
  mint5: "#F3FBFC",
  mint10: "#D2F0F4",
  mint20: "#ADE4EB",
  mint30: "#84D7E0",
  mint40: "#5CCAD6",
  mint50: "#33BDCC",
  mint60: "#2997A3",
  mint70: "#1F717A",
  mint80: "#144B52",
  mint90: "#0A2629",

  //violet
  violet5: "#F5F3FB",
  violet10: "#DCD4F1",
  violet20: "#BFB1E6",
  violet30: "#9F8BDA",
  violet40: "#7E64CE",
  violet50: "#5E3DC2",
  violet60: "#4B319B",
  violet70: "#392574",
  violet80: "#26184E",
  violet90: "#130C27",

  //pink
  pink5: "#FEF1F5",
  pink10: "#FACCDC",
  pink20: "#F6A2BF",
  pink30: "#F174B7",
  pink40: "#ED459F",
  pink50: "#E81786",
  pink60: "#BA126C",
  pink70: "#8B0E51",
  pink80: "#5D0936",
  pink90: "#2E0513",
} as const;

export type ColorsType = typeof colors;
