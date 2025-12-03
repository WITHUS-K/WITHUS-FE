import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Option } from '@repo/ui/Option';
import { useFormFieldStatus } from '@web/app/[organization]/[slug]/_context/FormFieldStatusContext';
import { focusableWrapper } from '@web/app/[organization]/[slug]/_components/FormNavigator/FormNavigator.css';

export interface PartOption {
  id: number;
  label: string;
}

interface ApplicationPartsFormProps {
  parts: PartOption[];
  selectedPartId?: number;
  onChange: (part: PartOption) => void;
}

export function ApplicationPartsForm({
  parts,
  selectedPartId,
  onChange,
}: ApplicationPartsFormProps) {
  if (parts.length === 0) return null;

  const partStatus = useFormFieldStatus('part-select');

  return (
    <section id="part-select" tabIndex={-1} className={focusableWrapper}>
      <Flex gap="2.4rem" direction="column">
        <Flex gap="0.4rem" direction="column">
          <Flex gap="0.4rem" align="center">
            <Text variant="md1_text_semibold" color="grayscale70">
              지원 파트
            </Text>
            <Text variant="md2_text_semibold" color="error">
              *
            </Text>
          </Flex>
          <Text variant="sm_caption_medium" color="grayscale40">
            다른 파트에 지원할 경우, 지원서를 각각 제출해주세요.
          </Text>
        </Flex>
        <Flex gap="1rem">
          {parts.map((part) => (
            <Option
              key={part.id}
              type="radio"
              label={part.label}
              width="19.6rem"
              onFocus={partStatus.setEditing}
              isSelected={selectedPartId === part.id}
              onChange={() => {
                onChange(part);
                partStatus.setCompleted();
              }}
            />
          ))}
        </Flex>
      </Flex>
    </section>
  );
}
