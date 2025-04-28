import React from 'react';
import * as styles from './Divider.css';

import { vars } from '@repo/theme';

type ThemeColorKey = keyof typeof vars.colors;

export interface DividerProps {
  direction?: 'row' | 'column';
  length?: string;
  borderColor?: ThemeColorKey;
}

export const Divider = ({
  direction = 'row',
  length,
  borderColor = 'grayscale90',
}: DividerProps) => {
  const overrideSize: React.CSSProperties = {};
  if (length) {
    if (direction === 'row') {
      overrideSize.width = length;
    } else {
      overrideSize.height = length;
    }
  }

  return (
    <div
      className={`${styles.directionVariants[direction]} ${
        styles.colorVariants[borderColor]
      }`}
      style={overrideSize}
    />
  );
};
