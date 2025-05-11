import * as React from 'react';
import type { SVGProps } from 'react';
const SvgIcImage = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <path
      stroke="#A9ABC0"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M24.3 31.5H10.397c-.909 0-1.363 0-1.573-.18a.75.75 0 0 1-.261-.629c.022-.276.343-.597.986-1.24l12.754-12.754c.594-.594.891-.891 1.233-1.002a1.5 1.5 0 0 1 .927 0c.343.111.64.408 1.234 1.002L31.5 22.5v1.8m-7.2 7.2c2.52 0 3.78 0 4.743-.49a4.5 4.5 0 0 0 1.967-1.967c.49-.963.49-2.223.49-4.743m-7.2 7.2H11.7c-2.52 0-3.78 0-4.743-.49a4.5 4.5 0 0 1-1.967-1.967C4.5 28.08 4.5 26.82 4.5 24.3V11.7c0-2.52 0-3.78.49-4.743A4.5 4.5 0 0 1 6.957 4.99C7.92 4.5 9.18 4.5 11.7 4.5h12.6c2.52 0 3.78 0 4.743.49a4.5 4.5 0 0 1 1.967 1.967c.49.963.49 2.223.49 4.743v12.6M15.75 12.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0"
    />
  </svg>
);
export default SvgIcImage;
