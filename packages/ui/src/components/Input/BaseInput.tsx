import React, { forwardRef } from 'react';
import {
  inputWrapper,
  iconStyleVariants,
  inputStyleVariants,
} from './Input.css';
import { IcPwActive, IcPwDefault } from '../../icons/src/colored';

interface BaseInputProps extends React.HTMLAttributes<HTMLDivElement> {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  hasError?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
  size?: 'search' | 'club' | 'auth';
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  width?: string;
}

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  (
    {
      inputProps = {},
      hasError,
      success,
      icon,
      size = 'auth',
      showPasswordToggle,
      onTogglePassword,
      width = '100%',
      ...props
    },
    ref
  ) => {
    const state: 'default' | 'error' | 'success' = hasError
      ? 'error'
      : success
        ? 'success'
        : 'default';

    return (
      <div
        className={inputWrapper({ state, size })}
        {...props}
        style={{ width, ...props.style }}
      >
        <input {...inputProps} ref={ref} className={inputStyleVariants[size]} />

        {showPasswordToggle && inputProps.value && (
          <button
            className={iconStyleVariants({ size })}
            onClick={onTogglePassword}
            type="button"
          >
            {inputProps.type === 'password' ? (
              <IcPwDefault width={24} height={24} />
            ) : (
              <IcPwActive width={24} height={24} />
            )}
          </button>
        )}

        {icon && <span className={iconStyleVariants({ size })}>{icon}</span>}
      </div>
    );
  }
);

BaseInput.displayName = 'BaseInput';
export default BaseInput;
