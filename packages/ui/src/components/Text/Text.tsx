import { ReactNode } from 'react';
import { textColors, textVariants } from './Text.css';

interface TextProps {
  variant?: keyof typeof textVariants;
  color?: keyof typeof textColors;
  children: ReactNode;
}

const Text = ({
  variant = 'md1_text_regular',
  color = 'black',
  children,
}: TextProps) => {
  return (
    <p className={`${textVariants[variant]} ${textColors[color]}`}>
      {children}
    </p>
  );
};

export default Text;
