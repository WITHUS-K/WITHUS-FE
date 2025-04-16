import BaseInput from './BaseInput';
import { wrapper, errorTextStyle } from './Input.css';
import { IcInputError } from '../../icons/src/colored';
import { useState } from 'react';
import { Text } from '..';

interface TextFieldProps {
  title?: string;
  description?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password';
  errorMessage?: string;
  success?: boolean;
  size?: 'search' | 'club' | 'auth';
  width?: string;
}

const TextField = ({
  title,
  description,
  placeholder,
  value,
  onChange,
  type = 'text',
  errorMessage,
  success,
  size = 'auth',
  width,
}: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={wrapper}>
      <Text variant="md1_text_semibold" color="grayscale80">
        {title}
      </Text>
      {description && (
        <Text variant="md2_text_regular" color="grayscale40">
          {description}
        </Text>
      )}

      <BaseInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        hasError={!!errorMessage}
        success={success}
        size={size}
        showPasswordToggle={type === 'password'}
        isPasswordVisible={showPassword}
        onTogglePassword={() => setShowPassword((prev) => !prev)}
        width={width}
      />

      {errorMessage && (
        <div className={errorTextStyle}>
          <IcInputError width={24} height={24} />
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default TextField;
