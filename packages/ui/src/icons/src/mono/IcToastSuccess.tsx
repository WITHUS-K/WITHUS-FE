import type { SVGProps } from 'react';
const SvgIcToastSuccess = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 26 26"
    {...props}
  >
    <rect
      width={14.5}
      height={14.5}
      x={5.75}
      y={5.75}
      stroke="currentColor"
      strokeWidth={1.5}
      rx={7.25}
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m9.398 13 2.4 2.4 4.8-4.8"
    />
  </svg>
);
export default SvgIcToastSuccess;
