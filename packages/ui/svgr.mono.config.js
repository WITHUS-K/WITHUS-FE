module.exports = {
  icon: true,
  typescript: true,
  jsxRuntime: 'automatic',
  replaceAttrValues: {
    '#000': 'currentColor',
    '#000000': 'currentColor',
    '#fff': 'currentColor',
    '#ffffff': 'currentColor',
    '#A9ABC0': 'currentColor',
    '#353744': 'cuurentColor',
    //currentColor 로 변환할 아이콘 색상 유동적으로 추가하면 됨!!
  },
  svgProps: {
    width: '1em',
    height: '1em',
    fill: 'none',
  },
};
