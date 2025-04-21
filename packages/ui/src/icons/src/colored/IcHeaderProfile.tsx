import type { SVGProps } from 'react';
const SvgIcHeaderProfile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle cx={12} cy={12} r={12} fill="#D7D8E2" />
    <circle cx={12} cy={9} r={5} fill="#F2F3F6" />
    <mask
      id="ic_header_profile_svg__a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <circle cx={12} cy={12} r={12} fill="#F2F3F6" />
    </mask>
    <g mask="url(#ic_header_profile_svg__a)">
      <ellipse cx={12} cy={23} fill="#F2F3F6" rx={9} ry={7} />
    </g>
  </svg>
);
export default SvgIcHeaderProfile;
