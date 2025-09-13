import type { SVGProps } from 'react';
const SvgIcDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <g clipPath="url(#ic_delete_svg__a)">
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m7.648 7 10 10m0-10-10 10"
      />
    </g>
    <defs>
      <clipPath id="ic_delete_svg__a">
        <path fill="currentColor" d="M.648 0h24v24h-24z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcDelete;
