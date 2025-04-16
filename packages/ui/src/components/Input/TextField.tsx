import { forwardRef, useState } from 'react';
import { wrapper, errorTextStyle } from './Input.css';
import { IcInputError } from '../../icons/src/colored';
import BaseInput from './BaseInput';
import { Text } from '..';

interface TextFieldProps {
  title?: string;
  description?: string;
  errorMessage?: string;
  success?: boolean;
  size?: 'search' | 'club' | 'auth';
  width?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      title,
      description,
      errorMessage,
      success,
      size = 'auth',
      width = '100%',
      inputProps = {},
      containerProps = {},
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = inputProps.type === 'password';

    return (
      <div
        className={wrapper}
        {...containerProps}
        style={{ width, ...containerProps.style }}
      >
        {title && (
          <Text variant="md1_text_semibold" color="grayscale80">
            {title}
          </Text>
        )}
        {description && (
          <Text variant="md2_text_regular" color="grayscale40">
            {description}
          </Text>
        )}

        <BaseInput
          ref={ref}
          inputProps={{
            ...inputProps,
            // 패스워드 필드인 경우 토글 상태에 따라 type 변경
            type: isPasswordField
              ? showPassword
                ? 'text'
                : 'password'
              : inputProps.type,
          }}
          hasError={!!errorMessage}
          success={success}
          size={size}
          showPasswordToggle={isPasswordField}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
        />

        {errorMessage && (
          <div className={errorTextStyle}>
            <IcInputError width={24} height={24} />
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';
export default TextField;
