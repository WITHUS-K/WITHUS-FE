import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcToastSuccess = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <rect
      width={14.5}
      height={14.5}
      x={5.75}
      y={5.75}
      stroke="#2C60FF"
      strokeWidth={1.5}
      rx={7.25}
    />
    <path
      stroke="#2C60FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9.398 13 2.4 2.4 4.8-4.8"
    />
  </svg>
);
export default SvgIcToastSuccess;
