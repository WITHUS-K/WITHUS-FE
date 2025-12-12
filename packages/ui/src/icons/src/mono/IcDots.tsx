import type { SVGProps } from 'react';
const SvgIcDots = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 10 24"
    {...props}
  >
    <g fill="currentColor" clipPath="url(#ic_dots_svg__a)">
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
        <path fill="currentColor" d="M10 0v24H0V0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcDots;
