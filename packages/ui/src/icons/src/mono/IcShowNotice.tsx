import type { SVGProps } from 'react';
const SvgIcShowNotice = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 15.6V12m0-3.6h.009M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0"
    />
  </svg>
);
export default SvgIcShowNotice;
