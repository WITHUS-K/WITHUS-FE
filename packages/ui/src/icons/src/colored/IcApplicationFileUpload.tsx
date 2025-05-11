import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcApplicationFileUpload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={72}
    height={74}
    fill="none"
    {...props}
  >
    <g clipPath="url(#ic_application_file_upload_svg__a)">
      <rect width={72} height={73} y={0.5} fill="#F2F3F6" rx={10} />
      <circle cx={21.5} cy={24} r={7.5} fill="#A9ABC0" />
      <rect
        width={53.25}
        height={53.25}
        x={15.153}
        y={43}
        fill="#C4C6D4"
        rx={6}
        transform="rotate(45 15.153 43)"
      />
      <rect
        width={69}
        height={69}
        x={42}
        y={31}
        fill="#A9ABC0"
        rx={7.5}
        transform="rotate(30 42 31)"
      />
    </g>
    <defs>
      <clipPath id="ic_application_file_upload_svg__a">
        <rect width={72} height={73} y={0.5} fill="#fff" rx={10} />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcApplicationFileUpload;
