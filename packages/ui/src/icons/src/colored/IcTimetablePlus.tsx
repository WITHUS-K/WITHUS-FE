import type { SVGProps } from 'react';
const SvgIcTimetablePlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#7F82A1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M8 3.333v9.334M3.335 8h9.333"
    />
  </svg>
);
export default SvgIcTimetablePlus;
