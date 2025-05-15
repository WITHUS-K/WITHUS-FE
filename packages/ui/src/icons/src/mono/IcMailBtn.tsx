import type { SVGProps } from 'react';
const SvgIcMailBtn = (props: SVGProps<SVGSVGElement>) => (
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
      d="m2.352 7 8.165 5.715c.66.463.991.695 1.35.784a2 2 0 0 0 .968 0c.36-.09.69-.32 1.352-.784L22.352 7m-15.2 13h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.31-1.311c.328-.642.328-1.482.328-3.162V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C20.072 4 19.232 4 17.552 4h-10.4c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311c-.327.642-.327 1.482-.327 3.162v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.31 1.311C4.632 20 5.472 20 7.153 20"
    />
  </svg>
);
export default SvgIcMailBtn;
