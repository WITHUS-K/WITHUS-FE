import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcDots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={24}
    fill="none"
    {...props}
  >
    <g fill="#2C60FF" clipPath="url(#ic_dots_svg__a)">
      <circle cx={7} cy={6} r={1} />
      <circle cx={7} cy={10} r={1} />
      <circle cx={7} cy={14} r={1} />
      <circle cx={7} cy={18} r={1} />
      <circle cx={3} cy={6} r={1} />
      <circle cx={3} cy={10} r={1} />
      <circle cx={3} cy={14} r={1} />
      <circle cx={3} cy={18} r={1} />
    </g>
    <defs>
      <clipPath id="ic_dots_svg__a">
        <path fill="#fff" d="M10 0v24H0V0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcDots;
