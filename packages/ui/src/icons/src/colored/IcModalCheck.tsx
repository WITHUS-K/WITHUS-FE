import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcModalCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <path
      stroke="#2C60FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m11.25 18 4.5 4.5 9-9M33 18c0 8.284-6.716 15-15 15S3 26.284 3 18 9.716 3 18 3s15 6.716 15 15"
    />
  </svg>
);
export default SvgIcModalCheck;
