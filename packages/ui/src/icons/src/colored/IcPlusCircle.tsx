import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcPlusCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#A9ABC0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12.5 8v8m-4-4h8m6 0c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10 10 4.477 10 10"
    />
  </svg>
);
export default SvgIcPlusCircle;
