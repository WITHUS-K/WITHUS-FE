import { ReactNode } from 'react';
import { container } from './ModalContent.css';
type ModalContentProps = {
  children: ReactNode;
};

export function ModalContent({ children }: ModalContentProps) {
  return <section className={container}>{children}</section>;
}
