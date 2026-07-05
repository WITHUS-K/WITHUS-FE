import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Option } from '@repo/ui/Option';
import { useFormFieldStatus } from '@web/app/[organization]/[slug]/_context/FormFieldStatusContext';
import { focusableWrapper } from '@web/app/[organization]/[slug]/_components/FormNavigator/FormNavigator.css';
import type { RoleGroupOption } from '@web/utils/applicationParts';

export interface PartOption {
  id: number;
  label: string;
}

interface ApplicationPartsFormProps {
  parts: PartOption[];
  roleGroups?: RoleGroupOption[];
  selectedPartId?: number;
  selectedPartIds?: number[];
  onChange?: (part: PartOption) => void;
  onMultiChange?: (parts: PartOption[]) => void;
}

export function ApplicationPartsForm({
  parts,
  roleGroups,
  selectedPartId,
  selectedPartIds = [],
  onChange,
  onMultiChange,
}: ApplicationPartsFormProps) {
  if (parts.length === 0) return null;

  const partStatus = useFormFieldStatus('part-select');
  const isGrouped = roleGroups !== undefined && roleGroups.length > 0;

  const handleMultiToggle = (group: RoleGroupOption, part: PartOption) => {
    const groups = roleGroups ?? [];
    const selected = selectedPartIds.includes(part.id);
    const selectedInGroupCount = group.roles.filter((role) =>
      selectedPartIds.includes(role.id)
    ).length;

    if (!selected && selectedInGroupCount >= group.selectionMaxCount) {
      return;
    }

    const nextIds = selected
      ? selectedPartIds.filter((id) => id !== part.id)
      : [...selectedPartIds, part.id];
    const nextParts = parts.filter((candidate) => nextIds.includes(candidate.id));

    onMultiChange?.(nextParts);

    const isComplete = groups.every((currentGroup) => {
      const count = currentGroup.roles.filter((role) =>
        nextIds.includes(role.id)
      ).length;

      return (
        count >= currentGroup.selectionMinCount &&
        count <= currentGroup.selectionMaxCount
      );
    });

    if (isComplete) {
      partStatus.setCompleted();
    } else {
      partStatus.setEditing();
    }
  };

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
        {isGrouped ? (
          <Flex gap="2rem" direction="column">
            {roleGroups.map((group) => (
              <Flex key={group.id} gap="1rem" direction="column">
                <Text variant="md2_text_semibold" color="grayscale60">
                  {group.name}
                </Text>
                <Flex gap="1rem" style={{ flexWrap: 'wrap' }}>
                  {group.roles.map((part) => (
                    <Option
                      key={part.id}
                      type="checkbox"
                      label={part.label}
                      width="19.6rem"
                      onFocus={partStatus.setEditing}
                      isChecked={selectedPartIds.includes(part.id)}
                      onChange={() => handleMultiToggle(group, part)}
                    />
                  ))}
                </Flex>
              </Flex>
            ))}
          </Flex>
        ) : (
          <Flex gap="1rem" style={{ flexWrap: 'wrap' }}>
            {parts.map((part) => (
              <Option
                key={part.id}
                type="radio"
                label={part.label}
                width="19.6rem"
                onFocus={partStatus.setEditing}
                isSelected={selectedPartId === part.id}
                onChange={() => {
                  onChange?.(part);
                  partStatus.setCompleted();
                }}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </section>
  );
}
