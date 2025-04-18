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
  isPressed?: boolean; // ← 여기에 추가
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
      isPressed, // ← 기본값 설정
      leftIcon,
      children,
      width = '100%',
      disabled,
      className,
      style,
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
        className={`${buttonStyle(styleArgs)} ${className ?? ''}`}
        disabled={disabled}
        style={{ ...style, width }}
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
