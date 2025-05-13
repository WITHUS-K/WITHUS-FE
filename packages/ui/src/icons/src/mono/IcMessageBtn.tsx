import type { SVGProps } from 'react';
const SvgIcMessageBtn = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 25 24"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7.852 10.5h.01m4.49 0h.01m4.49 0h.01M7.352 18v2.335c0 .533 0 .8.109.937a.5.5 0 0 0 .391.188c.175 0 .383-.167.8-.5l2.385-1.908c.487-.39.73-.585 1.002-.724.24-.122.497-.212.762-.267.298-.061.61-.061 1.234-.061h2.517c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.31-1.311c.328-.642.328-1.482.328-3.162V7.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.072 3 18.232 3 16.552 3h-8.4c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311c-.327.642-.327 1.482-.327 3.162V14c0 .93 0 1.395.102 1.777a3 3 0 0 0 2.121 2.12c.382.103.847.103 1.777.103m1-7.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m4.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m4.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"
    />
  </svg>
);
export default SvgIcMessageBtn;
