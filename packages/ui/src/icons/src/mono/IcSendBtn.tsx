import type { SVGProps } from 'react';
const SvgIcSendBtn = (props: SVGProps<SVGSVGElement>) => (
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
      d="m10.949 13.054 7.35-7.35m-7.261 7.58 1.84 4.73c.162.417.243.625.36.686a.35.35 0 0 0 .322 0c.117-.06.198-.269.361-.685l4.613-11.822c.147-.376.22-.564.18-.684a.35.35 0 0 0-.22-.22c-.12-.04-.309.032-.685.18L5.988 10.08c-.417.163-.625.244-.686.361a.35.35 0 0 0 0 .323c.061.117.27.198.686.36l4.73 1.84c.085.033.128.05.163.075a.4.4 0 0 1 .082.081c.026.036.042.078.075.163"
    />
  </svg>
);
export default SvgIcSendBtn;
