'use client';
import { HTMLAttributes, ElementType, ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import { selectable } from './Selectable.css';

export interface SelectableProps extends HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
  disableHover?: boolean;
  tag?: ElementType;
  width?: string;
  height?: string;
  children: ReactNode;
}

export const Selectable = ({
  tag: Tag = 'div',
  isSelected = false,
  disableHover = false,
  width,
  height,
  className,
  children,
  style,
  ...rest
}: SelectableProps) => {
  const inlineStyles: CSSProperties = {
    paddingInline: '1.8rem',
    width,
    height,
    ...style,
  };

  return (
    <Tag
      {...rest}
      className={clsx(selectable({ isSelected, disableHover }), className)}
      style={inlineStyles}
    >
      {children}
    </Tag>
  );
};
