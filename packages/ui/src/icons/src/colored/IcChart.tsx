import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcChart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <g clipPath="url(#ic_chart_svg__a)">
      <path
        stroke="#A9ABC0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.667}
        d="M9.168 3.334h-3.5c-1.4 0-2.1 0-2.635.273A2.5 2.5 0 0 0 1.94 4.699c-.272.535-.272 1.235-.272 2.635v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.093c.535.272 1.235.272 2.635.272h7c1.4 0 2.1 0 2.635-.272a2.5 2.5 0 0 0 1.092-1.093c.273-.535.273-1.235.273-2.635v-3.5m-10 2.5h1.395c.408 0 .612 0 .804-.046q.256-.061.481-.2c.169-.102.313-.247.601-.535l7.969-7.969a1.768 1.768 0 0 0-2.5-2.5l-7.969 7.97c-.288.287-.432.431-.535.6q-.139.224-.2.482c-.046.191-.046.395-.046.803z"
      />
    </g>
    <defs>
      <clipPath id="ic_chart_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcChart;
