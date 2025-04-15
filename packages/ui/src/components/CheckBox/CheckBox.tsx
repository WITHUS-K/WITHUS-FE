import { HTMLAttributes } from 'react';
import { inputStyle, wrapperStyle, iconStyle } from './CheckBox.css';
import { IcCheck } from '@/icons/src/colored';

interface CheckBoxProps extends HTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
  onChange: () => void;
}

const CheckBox = ({ isChecked, onChange, ...props }: CheckBoxProps) => {
  return (
    <label className={wrapperStyle}>
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
