export type PaletteColor =
  | '#FF5C6C'
  | '#FF9D32'
  | '#FFD732'
  | '#32CA89'
  | '#32B6EE'
  | '#5E92FF'
  | '#B36FFF'
  | '#FF8FFF'
  | '#C4C6D4'
  | '#A9ABC0';

// export type TagColor =
//   | '#FF2A3A'
//   | '#EE6B00'
//   | '#E2A500'
//   | '#009857'
//   | '#0084BC'
//   | '#2C60FF'
//   | '#813DFF'
//   | '#F25DEB'
//   | '#7F82A1'
//   | '#5A5C72'
//   | '#EAEFFF';

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
  '#EAEFFF': { background: '#EAEFFF', circle: '#2C60FF' },
  '#FFFFFF': { background: '#FFFFFF', circle: '#7F82A1' },
  '#FFE6E9': { background: '#FFE6E9', circle: '#FF2A3A' },
} as const;

export type TagColor = keyof typeof tagColorMap;

export const allTagColors = Object.keys(tagColorMap) as TagColor[];

export function getTagColors(color: TagColor) {
  return tagColorMap[color];
}
// ——— 태그용 (OrgListItem 의 Tag) ———
export const tagHexToName = {
  '#FF2A3A': 'red',
  '#EE6B00': 'orange',
  '#E2A500': 'yellow',
  '#009857': 'green',
  '#0084BC': 'bluesky',
  '#2C60FF': 'blue',
  '#813DFF': 'purple',
  '#F25DEB': 'pink',
  '#7F82A1': 'gray',
  '#5A5C72': 'darkgray',
} as const;
export type TagHex = keyof typeof tagHexToName; // '#FF2A3A' | …
export type TagColorName = (typeof tagHexToName)[TagHex]; // 'red' | …
export const nameToTagHex: Record<TagColorName, TagHex> = Object.fromEntries(
  (Object.entries(tagHexToName) as [TagHex, TagColorName][]).map(
    ([hex, name]) => [name, hex]
  )
) as Record<TagColorName, TagHex>;

/** 서버 colorName → 태그 헥스 */
export function mapServerColorToTagHex(name: string): TagHex {
  return nameToTagHex[name as TagColorName] ?? '#7F82A1';
}
