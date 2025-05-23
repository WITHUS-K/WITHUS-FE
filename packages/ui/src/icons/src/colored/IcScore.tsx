import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcScore = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <path
      stroke="#2C60FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 12.578v-5.7c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.31c-.642-.328-1.482-.328-3.162-.328H8.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C4 4.358 4 5.198 4 6.878v10.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311c.642.327 1.482.327 3.162.327H12m2-11H8m2 4H8m8-8H8m6.5 12 2 2 4.5-4.5"
    />
  </svg>
);
export default SvgIcScore;
