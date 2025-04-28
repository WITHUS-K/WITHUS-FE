import type { SVGProps } from 'react';
const SvgIcLink = (props: SVGProps<SVGSVGElement>) => (
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
      d="m8.472 12.244-.943.943a3.333 3.333 0 0 1-4.714-4.714l.942-.943m8.486.943.943-.943a3.333 3.333 0 0 0-4.714-4.714l-.943.943m-1.862 6.576 4.667-4.667"
    />
  </svg>
);
export default SvgIcLink;
