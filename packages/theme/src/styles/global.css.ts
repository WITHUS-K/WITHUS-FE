import './reset.css';
import { globalStyle, globalFontFace } from '@vanilla-extract/css';

if (typeof document !== 'undefined') {
  globalFontFace('Pretendard Variable', {
    src: 'url("/font/subset-PretendardVariable.woff2") format("woff2")',
    fontStyle: 'normal',
    fontWeight: 'normal',
  });
}
globalStyle('*', {
  padding: '0',
  margin: '0',
  boxSizing: 'border-box',
});

globalStyle('ul, ol, li', {
  listStyle: 'none',
});

globalStyle('html, body', {
  fontSize: '62.5%',
  scrollBehavior: 'smooth',
  fontFamily: '"Pretendard Variable", sans-serif',
});

globalStyle('a', {
  textDecoration: 'none',
});
