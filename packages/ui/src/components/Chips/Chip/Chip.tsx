import React, { CSSProperties, ReactNode } from 'react';
import { chip } from './Chip.css';
import { colors } from '@repo/theme';

interface ChipProps {
  bg?: keyof typeof colors;
  color?: keyof typeof colors;
  children: ReactNode;
  style?: CSSProperties;
}

export const Chip = ({ bg, color, children, style }: ChipProps) => (
  <span className={chip({ bg, color })} style={style}>
    {children}
  </span>
);
