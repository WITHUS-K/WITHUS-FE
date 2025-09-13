import type { SVGProps } from 'react';
const SvgIcTrash = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.667 7h4.666M9 10h14m-1.556 0L20.9 20.52c-.082 1.578-.123 2.367-.388 2.965-.233.527-.585.95-1.01 1.215-.482.3-1.097.3-2.327.3h-2.348c-1.23 0-1.845 0-2.327-.3-.425-.265-.777-.688-1.01-1.215-.265-.598-.306-1.387-.388-2.966L10.556 10m3.888 4.5v5m3.112-5v5"
    />
  </svg>
);
export default SvgIcTrash;
