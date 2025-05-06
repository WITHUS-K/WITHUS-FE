import * as React from 'react';
import type { SVGProps } from 'react';
const SvgError = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <path
      stroke="#747693"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M24 16v8m0 8h-.02M4 24C4 12.954 12.954 4 24 4s20 8.954 20 20-8.954 20-20 20S4 35.046 4 24"
    />
  </svg>
);
export default SvgError;
