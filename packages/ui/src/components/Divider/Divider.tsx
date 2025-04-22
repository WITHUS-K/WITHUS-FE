import React from 'react';
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
  borderColor,
}: DividerProps) => {
  const defaultLength = '100%';
  const colorValue = vars.colors[borderColor ?? 'grayscale90'];
  const borderStyle = `1px solid ${colorValue}`;

  const dividerStyle: React.CSSProperties =
    direction === 'row'
      ? { width: length ?? defaultLength, height: 0, borderBottom: borderStyle }
      : { width: 0, height: length ?? defaultLength, borderLeft: borderStyle };

  return <div style={dividerStyle} />;
};
