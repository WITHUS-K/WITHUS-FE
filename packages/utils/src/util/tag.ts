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

export const tagHexToProfile = {
  '#FF3E51': 'red',
  '#FF8500': 'orange',
  '#FFCD00': 'yellow',
  '#32CA89': 'green',
  '#32B6EE': 'bluesky',
  '#4A84FF': 'blue',
  '#B36FFF': 'purple',
  '#FF68FF': 'pink',
  '#7F82A1': 'gray',
  '#747693': 'darkgray',
} as const;

export type ProfileHex = keyof typeof tagHexToProfile; // '#FF2A3A' | …
export type ProfileColorName = (typeof tagHexToProfile)[ProfileHex]; // 'red' | …

export const nameToProfileHex: Record<ProfileColorName, ProfileHex> =
  Object.fromEntries(
    (Object.entries(tagHexToProfile) as [ProfileHex, ProfileColorName][]).map(
      ([hex, name]) => [name, hex]
    )
  ) as Record<ProfileColorName, ProfileHex>;

export function mapServerColorToProfileHex(name: string): ProfileHex {
  return nameToProfileHex[name as ProfileColorName] ?? '#7F82A1';
}

// 배경색만 가져오는 함수
export function getProfileBackground(colorName: string): string {
  const hex = mapServerColorToProfileHex(colorName);
  return (
    profileBackgroundMap[hex]?.background ??
    profileBackgroundMap['#7F82A1'].background
  );
}

// 글자색(텍스트 컬러)을 헥스로 바로 가져오는 함수
export function getProfileTextColor(colorName: string): string {
  return mapServerColorToProfileHex(colorName);
}

export const profileBackgroundMap: Record<ProfileHex, { background: string }> =
  {
    '#FF3E51': { background: '#FFD5DA' },
    '#FF8500': { background: '#FFE1C6' },
    '#FFCD00': { background: '#FFEFB4' },
    '#32CA89': { background: '#ADF3BE' },
    '#32B6EE': { background: '#A6E3F8' },
    '#4A84FF': { background: '#9ACEFF' },
    '#B36FFF': { background: '#E1C7FF' },
    '#FF68FF': { background: '#FFC9FF' },
    '#7F82A1': { background: '#C4C6D4' },
    '#747693': { background: '#A9ABC0' },
  };

  const safeTagColors: TagColor[] = allTagColors.filter(
  (color) => color !== '#FFFFFF' && color !== '#FFE6E9' && color !== '#EAEFFF'
);

export function getPositionTagColor(index: number): TagColor {
  const length = safeTagColors.length;
  
  return safeTagColors[index % length] ?? '#7F82A1';
}