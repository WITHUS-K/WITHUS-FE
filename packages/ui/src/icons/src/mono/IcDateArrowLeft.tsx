import type { SVGProps } from 'react';
const SvgIcDateArrowLeft = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m15.5 18-6-6 6-6"
    />
  </svg>
);
export default SvgIcDateArrowLeft;
