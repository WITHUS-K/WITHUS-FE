'use client';

import BaseInput from './BaseInput';
import type { ReactNode, ChangeEvent } from 'react';

interface InputFieldProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
  size?: 'search' | 'club' | 'auth';
  width?: string;

  // 회원가입 동아리 검색 전용
  readOnly?: boolean;
  onClick?: () => void;
}

const InputField = ({
  placeholder,
  value,
  onChange,
  icon,
  size = 'search',
  width,
  readOnly,
  onClick,
}: InputFieldProps) => {
  return (
    <BaseInput
      inputProps={{
        value,
        onChange,
        placeholder,
        readOnly,
        onClick,
      }}
      icon={icon}
      size={size}
      width={width}
    />
  );
};

export default InputField;
