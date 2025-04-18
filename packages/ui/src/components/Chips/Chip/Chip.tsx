import React, { ReactNode } from 'react';
import { chipBase, chipBackgrounds, chipTextColors } from './Chip.css';

interface ChipProps {
  backgroundColor?: keyof typeof chipBackgrounds;
  color?: keyof typeof chipTextColors | 'inherit';
  children: ReactNode;
}

export const Chip = ({ backgroundColor, color, children }: ChipProps) => {
  const bgClass = backgroundColor ? chipBackgrounds[backgroundColor] : '';
  const txtClass = color && color !== 'inherit' ? chipTextColors[color] : '';

  const fallbackStyle: React.CSSProperties = {};
  if (!backgroundColor) {
    fallbackStyle.backgroundColor = 'lightgray';
  }
  if (!color) {
    fallbackStyle.color = 'black';
  } else if (color === 'inherit') {
    fallbackStyle.color = 'inherit';
  }

  return (
    <span
      className={`${chipBase} ${bgClass} ${txtClass}`}
      style={fallbackStyle}
    >
      {children}
    </span>
  );
};
