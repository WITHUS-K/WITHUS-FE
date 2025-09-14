import type { SVGProps } from 'react';
const SvgIcBin = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9.815 3h4.667M5.148 6h14m-1.555 0-.546 10.52c-.081 1.578-.122 2.367-.387 2.965-.234.527-.586.95-1.01 1.215-.482.3-1.097.3-2.328.3h-2.347c-1.23 0-1.846 0-2.328-.3-.424-.265-.776-.688-1.01-1.215-.265-.598-.306-1.387-.388-2.966L6.704 6m3.889 4.5v5m3.111-5v5"
    />
  </svg>
);
export default SvgIcBin;
