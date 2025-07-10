import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcNaviComplete = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <rect width={20} height={20} y={0.5} fill="#2C60FF" rx={10} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="m5 9.39 4 4.444 6-6.667"
    />
  </svg>
);
export default SvgIcNaviComplete;
