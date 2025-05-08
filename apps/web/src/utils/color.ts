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
