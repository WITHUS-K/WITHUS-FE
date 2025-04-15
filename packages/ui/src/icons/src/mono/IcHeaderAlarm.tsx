import type { SVGProps } from 'react';
const SvgIcHeaderAlarm = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 23 23"
    {...props}
  >
    <path
      stroke="#747693"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 9A6 6 0 1 0 4 9c0 7-3 10-3 10h18s-3-3-3-10"
    />
    <path stroke="#747693" strokeWidth={2} d="M12 20a2 2 0 0 1-4 0" />
    <circle cx={20} cy={3} r={3} fill="#2C60FF" />
  </svg>
);
export default SvgIcHeaderAlarm;
