export type TagColor =
  | '#FF2A3A'
  | '#EE6B00'
  | '#E2A500'
  | '#009857'
  | '#0084BC'
  | '#2C60FF'
  | '#813DFF'
  | '#F25DEB'
  | '#7F82A1'
  | '#5A5C72';

export const tagColorMap = {
  '#FF2A3A': { background: '#FFE6E9', circle: '#FF6974' },
  '#EE6B00': { background: '#FFEEDE', circle: '#FF995A' },
  '#E2A500': { background: '#FFF5CF', circle: '#FFD062' },
  '#009857': { background: '#D9FFE2', circle: '#76E79C' },
  '#0084BC': { background: '#DBF6FF', circle: '#87DAF9' },
  '#2C60FF': { background: '#EAEFFF', circle: '#9EB6FF' },
  '#813DFF': { background: '#EFEAFF', circle: '#C0AAFF' },
  '#F25DEB': { background: '#FFEDFE', circle: '#FFA5F5' },
  '#7F82A1': { background: '#F2F3F6', circle: '#C4C6D4' },
  '#5A5C72': { background: '#D7D8E2', circle: '#A9ABC0' },
} as const;

export function getTagColors(color: TagColor) {
  return tagColorMap[color];
}
