import type { SVGProps } from 'react';
const SvgIcRoleBtn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 17 16"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.148 5.6v4.8M5.748 8h4.8m3.6 0a6 6 0 1 1-12 0 6 6 0 0 1 12 0"
    />
  </svg>
);
export default SvgIcRoleBtn;
