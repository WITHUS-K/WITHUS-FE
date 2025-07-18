'use client';

import {
  ComponentPropsWithoutRef,
  CSSProperties,
  forwardRef,
  ReactElement,
} from 'react';
import {
  ButtonRecipeVariants,
  buttonStyle,
  iconSizeStyle,
  textVariantMap,
} from './Button.css';
import Text from '../Text/Text';
import { Spinner } from '../Spinner/Spinner';

export type ButtonVariant = 'main' | 'sub' | 'basic' | 'stroke' | 'white';
export type ButtonSize = '32' | '40' | '48' | '56' | '64';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isPressed?: boolean;
  leftIcon?: ReactElement;
  children: React.ReactNode;
  width?: CSSProperties['width'];
  disabled?: boolean;
  rightIcon?: ReactElement;
  isLoading?: boolean;
  loadingText?: string;
}

const spinnerSizeMap: Record<ButtonSize, number> = {
  '32': 12,
  '40': 14,
  '48': 16,
  '56': 18,
  '64': 20,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'main',
      size = '48',
      isPressed,
      leftIcon,
      children,
      width = '100%',
      disabled,
      className,
      style,
      rightIcon,
      type = 'button',
      isLoading = false,
      loadingText,
      ...props
    },
    ref
  ) => {
    const iconSizeClass = iconSizeStyle[size];
    const textVariant = textVariantMap[size];
    const spinnerSize = spinnerSizeMap[size];

    const styleArgs = {
      variant,
      size,
      ...(isPressed !== undefined ? { isPressed } : {}),
    };

    const displayLeftIcon = isLoading ? (
      <Spinner size={spinnerSize} />
    ) : (
      leftIcon
    );
    const displayChildren = isLoading ? loadingText || '처리 중...' : children;
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={type}
        className={`${buttonStyle(styleArgs)} ${className ?? ''}`}
        disabled={isDisabled}
        style={{ ...style, width }}
        {...props}
      >
        {displayLeftIcon && (
          <span className={iconSizeClass}>{displayLeftIcon}</span>
        )}
        <Text
          variant={textVariant}
          color="inherit"
          style={{ whiteSpace: 'nowrap' }}
        >
          {displayChildren}
        </Text>
        {!isLoading && rightIcon && (
          <span className={iconSizeClass}>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
