import type { SVGProps } from 'react';
const SvgIcAlaram = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 20 21"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7A6 6 0 1 0 4 7c0 7-3 10-3 10h18s-3-3-3-10"
    />
    <path stroke="currentColor" strokeWidth={2} d="M12 18a2 2 0 0 1-4 0" />
  </svg>
);
export default SvgIcAlaram;
