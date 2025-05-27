'use client';
import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import {
  tagBase,
  tagColorVariants,
  tagVariants,
  dotBase,
  dotColorVariants,
  hideDot,
} from './Tag.css';
import { TagColor } from '@repo/utils';

interface TagProps extends PropsWithChildren<{}> {
  color: TagColor;
  withCircle?: boolean;
  isDotBaseStyle?: boolean;
}

export default function Tag({
  color,
  withCircle = false,
  isDotBaseStyle = false,
  children,
}: TagProps) {
  const sizeClass = withCircle ? tagVariants.withCircle : tagVariants.noCircle;
  const colorClass = tagColorVariants[color];
  const dotClass = withCircle
    ? clsx(dotBase, dotColorVariants[color])
    : hideDot;

  const showDot = withCircle && !isDotBaseStyle;

  return (
    <span className={clsx(tagBase, sizeClass, colorClass)}>
      {showDot && <span className={clsx(dotBase, dotColorVariants[color])} />}{' '}
      {children}
    </span>
  );
}
