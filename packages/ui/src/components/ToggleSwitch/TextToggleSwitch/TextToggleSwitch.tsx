'use client';

import React from 'react';
import clsx from 'clsx';
import {
  wrapper,
  container,
  highlight,
  segment,
  variants,
} from './TextToggleSwitch.css';

export interface Option<T extends string | number> {
  value: T;
  label: string;
}

export type OptionsList<T extends string | number> =
  | [Option<T>, Option<T>]
  | [Option<T>, Option<T>, Option<T>]
  | [Option<T>, Option<T>, Option<T>, Option<T>]
  | [Option<T>, Option<T>, Option<T>, Option<T>, Option<T>];

export interface TextToggleSwitchProps<T extends string | number> {
  options: OptionsList<T>;
  selected: T;
  onChange: (value: T) => void;
  className?: string;
  fullWidth?: boolean;
}

export function TextToggleSwitch<T extends string | number>({
  options,
  selected,
  onChange,
  className,
  fullWidth = false,
}: TextToggleSwitchProps<T>) {
  const SEGMENT_WIDTH = 120;
  const count = options.length;
  const selectedIndex = options.findIndex((opt) => opt.value === selected);

  const wrapperClass = fullWidth ? wrapper.full : wrapper.base;
  const offset = fullWidth
    ? `${98.5 * selectedIndex}%`
    : `${SEGMENT_WIDTH * selectedIndex}px`;

  const inlineStyle = fullWidth
    ? ({ '--segment-width': `${100 / count}%` } as React.CSSProperties)
    : undefined;

  return (
    <div className={clsx(wrapperClass, className)}>
      <div className={container} style={inlineStyle}>
        <div
          className={highlight}
          style={{ transform: `translateX(${offset})` }}
        />
        {options.map((opt) => {
          const isSelected = opt.value === selected;
          return (
            <div
              key={String(opt.value)}
              role="tab"
              aria-selected={isSelected}
              tabIndex={0}
              className={clsx(
                segment,
                isSelected ? variants.selected : variants.unselected
              )}
              onClick={() => onChange(opt.value)}
            >
              {opt.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
