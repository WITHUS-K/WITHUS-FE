import { headerStyle } from './ModalHeader.css';
import { Text } from '@/components';

type ModalHeaderProps = {
  text?: string;
};

export function ModalHeader({ text }: ModalHeaderProps) {
  return (
    <div className={headerStyle}>
      <Text variant="md1_text_bold" color="grayscale90">
        {text}
      </Text>
    </div>
  );
}
