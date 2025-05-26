import type { SVGProps } from 'react';
const SvgIcCharts = (props: SVGProps<SVGSVGElement>) => (
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
      d="M20.352 20v-7m-8 7V10m-8 10v-4m9.406-10.972 5.169 1.938M11.15 5.4 5.552 9.6m15.86-3.16a1.5 1.5 0 1 1-2.121 2.12 1.5 1.5 0 0 1 2.121-2.12m-16 3a1.5 1.5 0 1 1-2.121 2.12 1.5 1.5 0 0 1 2.121-2.12m8-6a1.5 1.5 0 1 1-2.121 2.12 1.5 1.5 0 0 1 2.121-2.12"
    />
  </svg>
);
export default SvgIcCharts;
