import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcProfilePreviewHover = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <g clipPath="url(#ic_profile_preview_hover_svg__a)">
      <rect width={36} height={36} fill="#EAEFFF" rx={5} />
      <circle
        cx={10.75}
        cy={11.75}
        r={3.75}
        fill="url(#ic_profile_preview_hover_svg__b)"
      />
      <rect
        width={26.625}
        height={26.625}
        x={7.576}
        y={21.25}
        fill="url(#ic_profile_preview_hover_svg__c)"
        rx={3}
        transform="rotate(45 7.576 21.25)"
      />
      <rect
        width={34.5}
        height={34.5}
        x={21}
        y={15.25}
        fill="url(#ic_profile_preview_hover_svg__d)"
        rx={3.75}
        transform="rotate(30 21 15.25)"
      />
    </g>
    <defs>
      <linearGradient
        id="ic_profile_preview_hover_svg__b"
        x1={10.75}
        x2={10.75}
        y1={8}
        y2={15.5}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4A7EFF" />
        <stop offset={1} stopColor="#2C60FF" />
      </linearGradient>
      <linearGradient
        id="ic_profile_preview_hover_svg__c"
        x1={23.167}
        x2={8.45}
        y1={36.949}
        y2={22.232}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#7294FF" />
        <stop offset={1} stopColor="#90B2FF" />
      </linearGradient>
      <linearGradient
        id="ic_profile_preview_hover_svg__d"
        x1={21.563}
        x2={34.781}
        y1={16.224}
        y2={39.12}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#4A7EFF" />
        <stop offset={1} stopColor="#2C60FF" />
      </linearGradient>
      <clipPath id="ic_profile_preview_hover_svg__a">
        <rect width={36} height={36} fill="#fff" rx={5} />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcProfilePreviewHover;
