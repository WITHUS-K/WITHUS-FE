import { typography } from "./typography";

export const fontStyles = {
  //xxl-title
  xxl_title_bold: {
    fontSize: typography.fontSize[28],
    fontWeight: typography.fontWeight.bold,
  },
  xxl_title_semibold: {
    fontSize: typography.fontSize[28],
    fontWeight: typography.fontWeight.semibold,
  },

  //xl-title
  xl_title_bold: {
    fontSize: typography.fontSize[24],
    fontWeight: typography.fontWeight.bold,
  },
  xl_title_semibold: {
    fontSize: typography.fontSize[24],
    fontWeight: typography.fontWeight.semibold,
  },

  //lg-subtitle
  lg_subtitle_bold: {
    fontSize: typography.fontSize[20],
    fontWeight: typography.fontWeight.bold,
  },
  lg_subtitle_semibold: {
    fontSize: typography.fontSize[20],
    fontWeight: typography.fontWeight.semibold,
  },
  lg_subtitle_medium: {
    fontSize: typography.fontSize[20],
    fontWeight: typography.fontWeight.medium,
  },

  //md1-text
  md1_text_bold: {
    fontSize: typography.fontSize[18],
    fontWeight: typography.fontWeight.bold,
  },
  md1_text_semibold: {
    fontSize: typography.fontSize[18],
    fontWeight: typography.fontWeight.semibold,
  },
  md1_text_medium: {
    fontSize: typography.fontSize[18],
    fontWeight: typography.fontWeight.medium,
  },
  md1_text_regular: {
    fontSize: typography.fontSize[18],
    fontWeight: typography.fontWeight.regular,
  },

  //md2-text
  md2_text_bold: {
    fontSize: typography.fontSize[16],
    fontWeight: typography.fontWeight.bold,
  },
  md2_text_semibold: {
    fontSize: typography.fontSize[16],
    fontWeight: typography.fontWeight.semibold,
  },
  md2_text_medium: {
    fontSize: typography.fontSize[16],
    fontWeight: typography.fontWeight.medium,
  },
  md2_text_regular: {
    fontSize: typography.fontSize[16],
    fontWeight: typography.fontWeight.regular,
  },

  //sm-caption
  sm_caption_semibold: {
    fontSize: typography.fontSize[14],
    fontWeight: typography.fontWeight.semibold,
  },
  sm_caption_medium: {
    fontSize: typography.fontSize[14],
    fontWeight: typography.fontWeight.medium,
  },
  sm_caption_regular: {
    fontSize: typography.fontSize[14],
    fontWeight: typography.fontWeight.regular,
  },

  //xs-caption
  xs_caption_semibold: {
    fontSize: typography.fontSize[12],
    fontWeight: typography.fontWeight.semibold,
  },
  xs_caption_medium: {
    fontSize: typography.fontSize[12],
    fontWeight: typography.fontWeight.medium,
  },
  xs_caption_regular: {
    fontSize: typography.fontSize[12],
    fontWeight: typography.fontWeight.regular,
  },
} as const;

export type fontStylesType = typeof fontStyles;
