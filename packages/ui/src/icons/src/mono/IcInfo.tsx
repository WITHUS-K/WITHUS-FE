import type { SVGProps } from 'react';
const SvgIcInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <g clipPath="url(#ic_info_svg__a)">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12V9m0-3h-.008M1.5 9a7.5 7.5 0 1 0 15 0 7.5 7.5 0 0 0-15 0"
      />
    </g>
    <defs>
      <clipPath id="ic_info_svg__a">
        <path fill="currentColor" d="M18 0H0v18h18z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcInfo;
