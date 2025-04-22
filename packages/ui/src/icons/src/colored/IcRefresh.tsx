import type { SVGProps } from 'react';
const SvgIcRefresh = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      stroke="#2C60FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#ic_refresh_svg__a)"
    >
      <path d="M6.04 12.667a6 6 0 1 0 .326-2.725" />
      <path d="M6 6.667v3.334h3.333" />
    </g>
    <defs>
      <clipPath id="ic_refresh_svg__a">
        <path fill="currentColor" d="M4 4h16v16H4z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcRefresh;
