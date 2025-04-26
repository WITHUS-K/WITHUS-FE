import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcLoading = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={120}
    height={120}
    fill="none"
    {...props}
  >
    <circle cx={60} cy={60} r={60} fill="#7294FF" />
    <circle cx={60.001} cy={60.001} r={49.286} fill="#fff" />
    <rect width={6} height={6} x={57} y={15.857} fill="#D7D8E2" rx={3} />
    <rect
      width={6}
      height={6}
      x={25.285}
      y={32.527}
      fill="#D7D8E2"
      rx={3}
      transform="rotate(-45 25.285 32.527)"
    />
    <rect
      width={6}
      height={6}
      fill="#D7D8E2"
      rx={3}
      transform="scale(1 -1)rotate(-45 -92.576 -74.105)"
    />
    <rect
      width={6}
      height={6}
      fill="#D7D8E2"
      rx={3}
      transform="scale(-1 1)rotate(-45 -8.156 130.745)"
    />
    <rect
      width={6}
      height={6}
      x={94.84}
      y={87.166}
      fill="#D7D8E2"
      rx={3}
      transform="rotate(135 94.84 87.166)"
    />
    <rect
      width={6}
      height={6}
      x={21.855}
      y={57}
      fill="#D7D8E2"
      rx={3}
      transform="rotate(90 21.855 57)"
    />
    <rect
      width={6}
      height={6}
      x={104.145}
      y={57}
      fill="#D7D8E2"
      rx={3}
      transform="rotate(90 104.145 57)"
    />
    <rect width={6} height={6} x={57} y={98.143} fill="#D7D8E2" rx={3} />
    <rect
      width={7.714}
      height={33}
      x={56.145}
      y={28.285}
      fill="#9EB6FF"
      rx={3.857}
    />
    <rect
      width={7.714}
      height={30.857}
      x={86.144}
      y={56.143}
      fill="#5680FF"
      rx={3.857}
      transform="rotate(90 86.144 56.143)"
    />
    <rect
      width={10.286}
      height={10.286}
      x={54.855}
      y={54.857}
      fill="#FFD676"
      rx={5.143}
    />
  </svg>
);
export default SvgIcLoading;
