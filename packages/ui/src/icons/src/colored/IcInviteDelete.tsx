import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcInviteDelete = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <g clipPath="url(#ic_invite_delete_svg__a)">
      <path
        stroke="#C4C6D4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m7 7.5 10 10m0-10-10 10"
      />
    </g>
    <defs>
      <clipPath id="ic_invite_delete_svg__a">
        <path fill="#fff" d="M0 .5h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcInviteDelete;
