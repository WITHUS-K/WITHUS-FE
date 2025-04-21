import type { SVGProps } from 'react';
const SvgIcSidebarInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <g clipPath="url(#ic_sidebar_info_svg__a)">
      <path
        stroke="#7F82A1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.94 4h-4.2c-1.68 0-2.52 0-3.163.327a3 3 0 0 0-1.31 1.311c-.328.642-.328 1.482-.328 3.162v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.22 22 6.06 22 7.74 22h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.312-1.311c.326-.642.326-1.482.326-3.162V13m-12 3h1.675c.49 0 .734 0 .964-.055a2 2 0 0 0 .578-.24c.202-.123.375-.296.72-.642L22.44 5.5a2.121 2.121 0 0 0-3-3l-9.563 9.563c-.346.346-.52.519-.643.72a2 2 0 0 0-.24.579c-.055.23-.055.474-.055.963z"
      />
    </g>
    <defs>
      <clipPath id="ic_sidebar_info_svg__a">
        <path fill="currentColor" d="M.94 0h24v24h-24z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcSidebarInfo;
