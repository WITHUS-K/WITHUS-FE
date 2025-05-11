import type { SVGProps } from 'react';
const SvgIcModify = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      stroke="#C4C6D4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 13.375h18V11.8c0-.98 0-1.47-.196-1.844a1.78 1.78 0 0 0-.787-.765C23.632 9 23.128 9 22.12 9H9.88c-1.008 0-1.512 0-1.897.19a1.78 1.78 0 0 0-.787.766C7 10.33 7 10.82 7 11.8v6.65c0 .98 0 1.47.196 1.845.173.329.448.596.787.764.385.191.889.191 1.897.191h5.22M18.25 23l1.823-.354c.158-.031.238-.047.312-.075a1 1 0 0 0 .186-.097c.065-.044.123-.1.237-.211l3.742-3.638a1.213 1.213 0 0 0 0-1.75 1.3 1.3 0 0 0-1.8 0l-3.742 3.638a2 2 0 0 0-.217.23 1 1 0 0 0-.1.181c-.029.072-.045.15-.076.304z"
    />
  </svg>
);
export default SvgIcModify;
