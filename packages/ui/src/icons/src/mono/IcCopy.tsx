import type { SVGProps } from 'react';
const SvgIcCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 8h6.311c1.991 0 2.987 0 3.748.388.669.34 1.213.884 1.553 1.553.388.76.388 1.757.388 3.748V20m-13.156 4h7.2c.996 0 1.494 0 1.874-.194.335-.17.607-.442.777-.777.194-.38.194-.878.194-1.873v-7.2c0-.996 0-1.494-.194-1.874a1.78 1.78 0 0 0-.777-.777c-.38-.194-.878-.194-1.874-.194h-7.2c-.995 0-1.493 0-1.873.194-.335.17-.607.442-.777.777C8 12.462 8 12.96 8 13.956v7.2c0 .995 0 1.493.194 1.873.17.335.442.607.777.777.38.194.878.194 1.873.194"
    />
  </svg>
);
export default SvgIcCopy;
