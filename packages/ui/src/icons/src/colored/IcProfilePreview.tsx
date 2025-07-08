import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcProfilePreview = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <g clipPath="url(#ic_profile_preview_svg__a)">
      <rect width={36} height={36} fill="#F2F3F6" rx={5} />
      <circle cx={10.75} cy={11.75} r={3.75} fill="#A9ABC0" />
      <rect
        width={26.625}
        height={26.625}
        x={7.576}
        y={21.25}
        fill="#C4C6D4"
        rx={3}
        transform="rotate(45 7.576 21.25)"
      />
      <rect
        width={34.5}
        height={34.5}
        x={21}
        y={15.25}
        fill="#A9ABC0"
        rx={3.75}
        transform="rotate(30 21 15.25)"
      />
    </g>
    <defs>
      <clipPath id="ic_profile_preview_svg__a">
        <rect width={36} height={36} fill="#fff" rx={5} />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcProfilePreview;
