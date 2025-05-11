export const hexToName: Record<string, string> = {
  '#FF5360': 'red',
  '#FF995A': 'orange',
  '#FFD062': 'yellow',
  '#5BDF87': 'green',
  '#86DAF9': 'bluesky',
  '#6289FF': 'blue',
  '#AD90FF': 'purple',
  '#F196F8': 'pink',
  '#C4C6D4': 'gray',
  '#A9ABC0': 'darkgray',
};
export const nameToHex = Object.fromEntries(
  Object.entries(hexToName).map(([hex, name]) => [name, hex])
) as Record<string, string>;

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
