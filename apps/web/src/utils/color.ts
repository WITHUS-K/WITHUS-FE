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

export function getTagColors(colorName: string) {
  const hex = mapServerColorToTagHex(colorName);
  return tagColorMap[hex] ?? tagColorMap['#7F82A1'];
}

export const nameToHex1: Record<string, string> = Object.entries(
  tagHexToName
).reduce(
  (acc, [hex, name]) => {
    acc[name] = hex;
    return acc;
  },
  {} as Record<string, string>
);

// 웹앱에서 재사용할 태그 컬러 맵
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

// 태그 컬러 키들만 뽑아서 배열로
export const TAG_COLOR_KEYS = Object.keys(tagColorMap) as Array<
  keyof typeof tagColorMap
>;
