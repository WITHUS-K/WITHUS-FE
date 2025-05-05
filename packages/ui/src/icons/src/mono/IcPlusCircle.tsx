import type { SVGProps } from 'react';
const SvgIcPlusCircle = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 9.2v5.6M9.2 12h5.6m4.2 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0"
    />
  </svg>
);
export default SvgIcPlusCircle;
