import './themes/theme.css'; // ← 이게 꼭 필요함
import './styles/global.css'; // ← 글로벌 스타일도 적용되게

export { sprinkles } from './sprinkles/sprinkles.css';
export type { Sprinkles } from './sprinkles/sprinkles.css';

export { vars } from './themes/theme.css';
export { themeClass } from './themes/theme.css';
export { tokens } from './tokens/tokens';
export type { TokensType } from './tokens/tokens';

export { colors } from './tokens/colors';
export type { ColorsType } from './tokens/colors';

export { typography } from './tokens/typography';
export type { TypographyType } from './tokens/typography';

export { fontStyles } from './tokens/fontStyles';
export type { fontStylesType } from './tokens/fontStyles';

export * from './styles/global.css';
export * from './themes/theme.css';
