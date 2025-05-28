import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcEditMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke="#7F82A1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.667}
      d="M17.5 18h-6.666m-8.75.418 4.624-1.779a5 5 0 0 0 .582-.245q.185-.099.35-.228a5 5 0 0 0 .46-.432l9.4-9.4a2.357 2.357 0 0 0-3.333-3.333l-9.4 9.4c-.224.224-.336.336-.432.46a2.5 2.5 0 0 0-.227.35c-.075.139-.132.286-.245.582zm0 0 1.715-4.46c.123-.319.184-.478.29-.551a.42.42 0 0 1 .315-.067c.126.024.247.145.489.386l1.882 1.883c.242.242.363.363.387.488a.42.42 0 0 1-.067.316c-.073.105-.233.167-.552.29z"
    />
  </svg>
);
export default SvgIcEditMenu;
