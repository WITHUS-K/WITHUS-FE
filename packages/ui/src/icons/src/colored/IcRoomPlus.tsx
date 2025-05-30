import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcRoomPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <rect width={28} height={28} fill="#BECEFF" rx={14} />
    <path
      stroke="#2C60FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.714}
      d="M14 8v12m-6-6h12"
    />
  </svg>
);
export default SvgIcRoomPlus;
