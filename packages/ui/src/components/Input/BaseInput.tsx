'use client';

import React, { forwardRef } from 'react';
import {
  inputWrapper,
  iconStyleVariants,
  inputStyleVariants,
} from './Input.css';
import {
  IcPwActive,
  IcPwDefault,
  IcBaseInputDelete,
} from '../../icons/src/colored';

interface BaseInputProps extends React.HTMLAttributes<HTMLDivElement> {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  hasError?: boolean;
  success?: boolean;
  icon?: React.ReactNode;
  size?: 'search' | 'club' | 'auth';
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showClear?: boolean;
  onClear?: () => void;
  width?: string;
  readOnly?: boolean;
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
      showClear,
      onClear,
      width = '100%',
      readOnly = false,
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
        data-read-only={readOnly ? 'true' : 'false'}
        {...props}
        style={{ width, ...props.style }}
      >
        <input
          {...inputProps}
          autoComplete="off"
          ref={ref}
          className={inputStyleVariants[size]}
          {...props}
          style={{ width, ...props.style }}
        />

        {showPasswordToggle && inputProps.value && (
          <button
            className={iconStyleVariants({ size })}
            onClick={onTogglePassword}
            type="button"
            style={{ height: '2.4rem' }}
          >
            {inputProps.type === 'password' ? (
              <IcPwDefault width={24} height={24} />
            ) : (
              <IcPwActive width={24} height={24} />
            )}
          </button>
        )}

        {showClear && inputProps.value && (
          <button
            className={iconStyleVariants({ size })}
            onClick={(e) => {
              e.preventDefault();
              inputProps.onChange?.({
                ...(e as any),
                target: { ...(e.target as any), value: '' },
              } as React.ChangeEvent<HTMLInputElement>);
              onClear?.();
            }}
            type="button"
            style={{ height: '2.4rem' }}
          >
            <IcBaseInputDelete width={24} height={24} />
          </button>
        )}

        {icon && <span className={iconStyleVariants({ size })}>{icon}</span>}
      </div>
    );
  }
);

BaseInput.displayName = 'BaseInput';
export default BaseInput;
