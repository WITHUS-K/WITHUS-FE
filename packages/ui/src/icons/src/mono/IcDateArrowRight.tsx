import type { SVGProps } from 'react';
const SvgIcDateArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <path
      stroke="cuurentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9.5 18 6-6-6-6"
    />
  </svg>
);
export default SvgIcDateArrowRight;
