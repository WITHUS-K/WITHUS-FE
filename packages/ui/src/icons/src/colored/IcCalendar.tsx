import type { SVGProps } from 'react';
const SvgIcCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      stroke="#A9ABC0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M42 23v-5.4c0-3.36 0-5.04-.654-6.324a6 6 0 0 0-2.622-2.622C37.44 8 35.76 8 32.4 8H15.6c-3.36 0-5.04 0-6.324.654a6 6 0 0 0-2.622 2.622C6 12.56 6 14.24 6 17.6v16.8c0 3.36 0 5.04.654 6.324a6 6 0 0 0 2.622 2.622C10.56 44 12.24 44 15.6 44H25m17-24H6M32 4v8M16 4v8m20 30V30m-6 6h12"
    />
  </svg>
);
export default SvgIcCalendar;
