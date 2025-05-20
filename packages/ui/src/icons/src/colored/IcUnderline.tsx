import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcUnderline = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#A9ABC0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.5 5.625v5.25a4.5 4.5 0 1 1-9 0v-5.25M6 18.375h12"
    />
  </svg>
);
export default SvgIcUnderline;
