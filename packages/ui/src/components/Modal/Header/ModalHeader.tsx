import { headerStyle } from './ModalHeader.css';
import { ReactNode } from 'react';
import { Text } from '../..';

type ModalHeaderProps = {
  text?: string;
  children?: ReactNode;
};

export function ModalHeader({ text, children }: ModalHeaderProps) {
  return (
    <div className={headerStyle}>
      {children
        ? children
        : text && (
            <Text variant="md1_text_bold" color="grayscale90">
              {text}
            </Text>
          )}
    </div>
  );
}
