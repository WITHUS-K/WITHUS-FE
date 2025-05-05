'use client';
import { HTMLAttributes } from 'react';
import clsx from 'clsx';
import * as styles from './Radio.css';

interface RadioProps extends HTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  onChange: () => void;
  size?: number | string;
}

export const Radio = ({
  isChecked,
  onChange,
  size = 1.8,
  ...props
}: RadioProps) => {
  const dim = typeof size === 'number' ? `${size}rem` : size;

  return (
    <label
      className={clsx(styles.wrapper, isChecked && styles.checked)}
      style={{ width: dim, height: dim }}
    >
      <input
        {...props}
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className={styles.input}
      />
    </label>
  );
};
