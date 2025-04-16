import {
  ComponentPropsWithoutRef,
  CSSProperties,
  forwardRef,
  ReactElement,
} from 'react';
import { buttonStyle, iconSizeStyle, textVariantMap } from './Button.css';
import Text from '../Text/Text';
export type ButtonVariant = 'main' | 'sub' | 'basic' | 'stroke' | 'white';
export type ButtonSize = '32' | '40' | '48' | '56' | '64';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
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
      leftIcon,
      children,
      width,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const iconSizeClass = iconSizeStyle[size];
    const textVariant = textVariantMap[size];

    return (
      <button
        ref={ref}
        className={`${buttonStyle({ variant, size })} ${className ?? ''}`}
        disabled={disabled}
        style={{ width }}
        {...props}
      >
        {leftIcon && <span className={iconSizeClass}>{leftIcon}</span>}
        <Text variant={textVariant} color="inherit">
          {children}
        </Text>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
