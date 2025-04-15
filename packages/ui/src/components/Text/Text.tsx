import { ReactNode } from 'react';
import { textColors, textVariants } from './Text.css';

interface TextProps {
  variant?: keyof typeof textVariants;
  color?: keyof typeof textColors | 'inherit';
  children: ReactNode;
}

const Text = ({ variant = 'md1_text_regular', color, children }: TextProps) => {
  const shouldFallback = !color;
  const isInherit = color === 'inherit';
  const colorClass = color && !isInherit ? textColors[color] : '';

  return (
    <p
      className={`${textVariants[variant]} ${colorClass}`}
      style={
        shouldFallback
          ? { color: 'black' }
          : isInherit
            ? { color: 'inherit' }
            : undefined
      }
    >
      {children}
    </p>
  );
};

export default Text;
