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
}

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
      type = 'button',
      ...props
    },
    ref
  ) => {
    const iconSizeClass = iconSizeStyle[size];
    const textVariant = textVariantMap[size];

    const styleArgs = {
      variant,
      size,
      ...(isPressed !== undefined ? { isPressed } : {}),
    };

    return (
      <button
        ref={ref}
        type={type}
        className={`${buttonStyle(styleArgs)} ${className ?? ''}`}
        disabled={disabled}
        style={{ ...style, width }}
        {...props}
      >
        {leftIcon && <span className={iconSizeClass}>{leftIcon}</span>}
        <Text
          variant={textVariant}
          color="inherit"
          style={{ whiteSpace: 'nowrap' }}
        >
          {children}
        </Text>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
