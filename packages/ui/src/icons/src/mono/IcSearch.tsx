import type { SVGProps } from 'react';
const SvgIcSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 18 18"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m15.75 15.75-4.5-4.5m1.5-3.75a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0"
    />
  </svg>
);
export default SvgIcSearch;
