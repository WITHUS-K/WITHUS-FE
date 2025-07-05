export const PART_TARGETS = ['공통', '기획', '디자인', '프론트엔드', '백엔드'];
export const BLANK_OPTIONS = ['공백 포함', '공백 제외'];
export const CHAR_LIMITS = ['제한 없음', '250자', '500자', '750자', '1000자'];
export const FILE_COUNTS = ['1개', '2개', '3개', '4개', '5개'];
export const FILE_SIZES = ['5MB', '10MB', '15MB', '20MB', '25MB', '30MB'];
export const UPLOAD_NOTICE = '지원 형식: PDF, PNG, JPG';

export interface Option<T extends string | number> {
  value: T;
  label: string;
}

export type OptionsList<T extends string | number> =
  | [Option<T>, Option<T>]
  | [Option<T>, Option<T>, Option<T>]
  | [Option<T>, Option<T>, Option<T>, Option<T>]
  | [Option<T>, Option<T>, Option<T>, Option<T>, Option<T>];

export const DETAIL_TYPE_OPTIONS: OptionsList<'text' | 'file'> = [
  { value: 'text', label: '장문형' },
  { value: 'file', label: '파일 업로드' },
];

export type DetailType = (typeof DETAIL_TYPE_OPTIONS)[number]['value'];
