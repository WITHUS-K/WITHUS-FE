import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.333 4 6 11.333 2.667 8"
    />
  </svg>
);
export default SvgIcCheck;
