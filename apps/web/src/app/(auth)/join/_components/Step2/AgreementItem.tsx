'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { CheckBox } from '@repo/ui/CheckBox';
import { listStyle } from './Step2.css';

interface AgreementItemProps {
  isChecked: boolean;
  onChange: () => void;
  label: string;
  onClick?: () => void;
}

export default function AgreementItem({
  isChecked,
  onChange,
  label,
  onClick,
}: AgreementItemProps) {
  return (
    <Flex align="center" gap="1.2rem" className={listStyle} onClick={onClick}>
      <CheckBox isChecked={isChecked} onChange={onChange} />
      <Flex align="center" gap="0.3rem">
        <Text variant="md2_text_medium" color="primary50">
          (필수)
        </Text>
        <Text variant="md2_text_medium" color="grayscale80">
          {label}
        </Text>
      </Flex>
    </Flex>
  );
}
