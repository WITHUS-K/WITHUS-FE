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
  // buildRoleGroups()가 실제 그룹이 없을 때 만드는 합성 그룹(id: 0)은
  // 섹션 제목("지원 파트")과 이름이 겹치므로 그룹 헤더를 별도로 보여주지 않는다.
  const hasRealGroups = (roleGroups ?? []).some((group) => group.id !== 0);

  const commitSelection = (nextIds: number[]) => {
    const groups = roleGroups ?? [];
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

  const handleMultiToggle = (group: RoleGroupOption, part: PartOption) => {
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

    commitSelection(nextIds);
  };

  const handleSingleSelect = (group: RoleGroupOption, part: PartOption) => {
    const otherGroupIds = selectedPartIds.filter(
      (id) => !group.roles.some((role) => role.id === id)
    );
    const nextIds = [...otherGroupIds, part.id];

    commitSelection(nextIds);
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
            {hasRealGroups
              ? '그룹별로 지원 파트를 선택해주세요.'
              : '다른 파트에 지원할 경우, 지원서를 각각 제출해주세요.'}
          </Text>
        </Flex>
        {isGrouped ? (
          <Flex gap="2rem" direction="column">
            {roleGroups.map((group) => (
              <Flex key={group.id} gap="1rem" direction="column">
                {group.id !== 0 && (
                  <Text variant="md2_text_semibold" color="grayscale60">
                    {group.name}
                  </Text>
                )}
                <Flex gap="1rem" style={{ flexWrap: 'wrap' }}>
                  {group.roles.map((part) =>
                    group.selectionMaxCount === 1 ? (
                      <Option
                        key={part.id}
                        type="radio"
                        label={part.label}
                        width="19.6rem"
                        onFocus={partStatus.setEditing}
                        isSelected={selectedPartIds.includes(part.id)}
                        onChange={() => handleSingleSelect(group, part)}
                      />
                    ) : (
                      <Option
                        key={part.id}
                        type="checkbox"
                        label={part.label}
                        width="19.6rem"
                        onFocus={partStatus.setEditing}
                        isChecked={selectedPartIds.includes(part.id)}
                        onChange={() => handleMultiToggle(group, part)}
                      />
                    )
                  )}
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
