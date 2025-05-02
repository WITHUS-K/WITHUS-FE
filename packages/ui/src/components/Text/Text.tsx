import { ReactNode, CSSProperties, HTMLAttributes } from 'react';
import { textColors, textVariants } from './Text.css';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: keyof typeof textVariants;
  color?: keyof typeof textColors | 'inherit';
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

const Text = ({
  variant = 'md1_text_regular',
  color,
  children,
  style,
  className,
  ...rest
}: TextProps) => {
  const shouldFallback = !color;
  const isInherit = color === 'inherit';
  const colorClass = color && !isInherit ? textColors[color] : '';

  const combinedClassName = [textVariants[variant], colorClass, className]
    .filter(Boolean)
    .join(' ');

  const inlineColorStyle: CSSProperties | undefined = shouldFallback
    ? { color: 'black' }
    : isInherit
      ? { color: 'inherit' }
      : undefined;

  return (
    <p
      className={combinedClassName}
      style={{ ...inlineColorStyle, ...style, whiteSpace: 'nowrap' }}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Text;
