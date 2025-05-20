import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcBold = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#7F82A1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.125 12h6a3 3 0 1 0 0-6h-6zm0 0h6.75a3 3 0 1 1 0 6h-6.75z"
      opacity={0.7}
    />
  </svg>
);
export default SvgIcBold;
