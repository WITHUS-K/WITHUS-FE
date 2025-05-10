import type { SVGProps } from 'react';
const SvgIcRefresh = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#ic_refresh_svg__a)"
    >
      <path strokeWidth={1.5} d="M2.04 8.667a6 6 0 1 0 .327-2.725" />
      <path strokeWidth={1.333} d="M2 2.667v3.334h3.333" />
    </g>
    <defs>
      <clipPath id="ic_refresh_svg__a">
        <path fill="currentColor" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcRefresh;
