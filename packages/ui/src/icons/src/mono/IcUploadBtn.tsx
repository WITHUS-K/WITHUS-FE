import type { SVGProps } from 'react';
const SvgIcUploadBtn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m13.985 7.633-6.01 6.01a3.5 3.5 0 0 1-4.95-4.95l6.01-6.01a2.333 2.333 0 0 1 3.3 3.3l-5.774 5.775a1.167 1.167 0 1 1-1.65-1.65L9.978 5.04"
    />
  </svg>
);
export default SvgIcUploadBtn;
