import BaseInput from './BaseInput';
import type { ReactNode, ChangeEvent } from 'react';

interface InputFieldProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  size?: 'search' | 'club' | 'auth';
  width?: string;
}

const InputField = ({
  placeholder,
  value,
  onChange,
  icon,
  size = 'search',
  width,
}: InputFieldProps) => {
  return (
    <BaseInput
      inputProps={{
        value,
        onChange,
        placeholder,
      }}
      icon={icon}
      size={size}
      width={width}
    />
  );
};

export default InputField;
