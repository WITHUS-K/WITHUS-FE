import React, { ReactNode } from 'react';
import { chip } from './Chip.css';
import { colors } from '@repo/theme';

interface ChipProps {
  bg?: keyof typeof colors;
  color?: keyof typeof colors;
  children: ReactNode;
}

export const Chip = ({ bg, color, children }: ChipProps) => (
  <span className={chip({ bg, color })}>{children}</span>
);
