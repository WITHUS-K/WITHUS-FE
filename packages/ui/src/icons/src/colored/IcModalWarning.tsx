import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcModalWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <path
      stroke="#2C60FF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M3.253 27.898 15.875 6.593c.698-1.177 1.047-1.766 1.502-1.964.396-.172.85-.172 1.247 0 .454.198.803.787 1.5 1.964l12.623 21.305c.7 1.182 1.05 1.773.998 2.258a1.5 1.5 0 0 1-.624 1.057c-.403.287-1.102.287-2.5.287H5.379c-1.397 0-2.096 0-2.5-.287a1.5 1.5 0 0 1-.623-1.057c-.052-.485.298-1.076.998-2.258"
    />
    <path
      fill="#2C60FF"
      d="M17.9 12.756a1.5 1.5 0 0 1 1.5 1.499v5.998a1.5 1.5 0 1 1-3 0v-5.998a1.5 1.5 0 0 1 1.5-1.5M16.4 26.25a1.5 1.5 0 0 1 1.5-1.5h.015a1.5 1.5 0 1 1 0 3H17.9a1.5 1.5 0 0 1-1.5-1.5"
    />
  </svg>
);
export default SvgIcModalWarning;
