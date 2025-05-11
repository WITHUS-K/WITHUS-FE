import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcFileInfo = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 8.8V12m0 3.2h.008M20 12a8 8 0 1 0-16 0 8 8 0 0 0 16 0"
    />
  </svg>
);
export default SvgIcFileInfo;
