import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcCallout = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <rect width={18} height={18} x={3.5} y={2.996} fill="#A9ABC0" rx={9} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.5 15.996v-4m0-4h.01"
    />
  </svg>
);
export default SvgIcCallout;
