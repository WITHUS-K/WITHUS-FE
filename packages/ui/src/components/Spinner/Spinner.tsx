'use client';

import { CSSProperties } from 'react';
import * as styles from './Spinner.css';

export interface SpinnerProps {
  size?: string | number;
  color?: string;
  strokeWidth?: string | number;
  className?: string;
  style?: CSSProperties;
}

export function Spinner({
  size = 16,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
  style = {},
}: SpinnerProps) {
  const sizeValue = typeof size === 'number' ? `${size}px` : size;
  const strokeWidthValue =
    typeof strokeWidth === 'number' ? `${strokeWidth}px` : strokeWidth;

  return (
    <svg
      width={sizeValue}
      height={sizeValue}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${styles.spinner} ${className}`}
      style={style}
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke={color}
        strokeWidth={strokeWidthValue}
        strokeLinecap="round"
        strokeDasharray="37.7"
        strokeDashoffset="37.7"
        className={styles.spinnerCircle}
      />
    </svg>
  );
}
