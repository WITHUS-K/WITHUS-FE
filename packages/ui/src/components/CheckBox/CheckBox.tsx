'use client';

import { HTMLAttributes } from 'react';
import { inputStyle, wrapperStyle, iconStyle } from './CheckBox.css';
import { IcCheck } from '../../icons/src/colored';
interface CheckBoxProps extends HTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  onChange: () => void;
  size?: number | string;
}

const CheckBox = ({
  isChecked,
  onChange,
  size = 2.4,
  ...props
}: CheckBoxProps) => {
  const dimension = typeof size === 'number' ? `${size}rem` : size;

  return (
    <label
      className={wrapperStyle}
      style={{ width: dimension, height: dimension }}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className={inputStyle}
        {...props}
      />
      <IcCheck width={16} height={16} className={iconStyle} />
    </label>
  );
};

export default CheckBox;
