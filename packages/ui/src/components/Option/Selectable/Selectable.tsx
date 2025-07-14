'use client';
import {
  HTMLAttributes,
  ElementType,
  ReactNode,
  CSSProperties,
  MouseEvent,
} from 'react';
import clsx from 'clsx';
import { selectable } from './Selectable.css';

export interface SelectableProps extends HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
  disableHover?: boolean;
  tag?: ElementType;
  width?: string;
  height?: string;
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
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
  onClick,
  ...rest
}: SelectableProps) => {
  const inlineStyles: CSSProperties = {
    paddingInline: '1.8rem',
    minWidth: width,
    height,
    ...style,
  };

  return (
    <Tag
      {...rest}
      onClick={onClick}
      className={clsx(selectable({ isSelected, disableHover }), className)}
      style={inlineStyles}
    >
      {children}
    </Tag>
  );
};
