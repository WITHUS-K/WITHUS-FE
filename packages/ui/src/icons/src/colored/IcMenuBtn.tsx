import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcMenuBtn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#A9ABC0"
      stroke="#A9ABC0"
      strokeLinejoin="round"
      strokeWidth={0.667}
      d="m10.622 6.333.098-.015a.333.333 0 0 0 .197-.474l-.06-.08-2-2a.33.33 0 0 0-.419-.042l-.051.043-2 2a.333.333 0 0 0 .235.568zM6.622 9.667l-.098.015a.333.333 0 0 0-.197.474l.06.08 2 2c.114.113.29.128.419.042l.051-.043 2-2a.333.333 0 0 0-.235-.568z"
    />
  </svg>
);
export default SvgIcMenuBtn;
