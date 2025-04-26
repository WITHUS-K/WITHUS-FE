import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#999BB4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m20 20-4.383-4.383m1.827-4.395a6.222 6.222 0 1 1-12.444 0 6.222 6.222 0 0 1 12.444 0"
    />
  </svg>
);
export default SvgIcSearch;
