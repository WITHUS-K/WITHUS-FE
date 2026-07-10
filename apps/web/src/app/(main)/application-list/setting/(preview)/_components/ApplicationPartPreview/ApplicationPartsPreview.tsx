import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Option } from '@repo/ui/Option';
import React from 'react';
import type { PartOption, RoleGroupOption } from '@web/utils/applicationParts';

interface Props {
  roleGroups: RoleGroupOption[];
  selectedPartIds: number[];
  onMultiChange: (ids: number[]) => void;
}

export function ApplicationPartsPreview({
  roleGroups,
  selectedPartIds,
  onMultiChange,
}: Props) {
  // buildRoleGroups()가 실제 그룹이 없을 때 만드는 합성 그룹(id: 0)은
  // 섹션 제목("지원 파트")과 이름이 겹치므로 그룹 헤더를 별도로 보여주지 않는다.
  const hasRealGroups = roleGroups.some((group) => group.id !== 0);

  const handleSingleSelect = (group: RoleGroupOption, part: PartOption) => {
    const otherGroupIds = selectedPartIds.filter(
      (id) => !group.roles.some((role) => role.id === id)
    );
    onMultiChange([...otherGroupIds, part.id]);
  };

  const handleMultiToggle = (group: RoleGroupOption, part: PartOption) => {
    const selected = selectedPartIds.includes(part.id);
    const selectedInGroupCount = group.roles.filter((role) =>
      selectedPartIds.includes(role.id)
    ).length;

    if (!selected && selectedInGroupCount >= group.selectionMaxCount) {
      return;
    }

    onMultiChange(
      selected
        ? selectedPartIds.filter((id) => id !== part.id)
        : [...selectedPartIds, part.id]
    );
  };

  return (
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
                    isSelected={selectedPartIds.includes(part.id)}
                    onChange={() => handleSingleSelect(group, part)}
                    width="19.6rem"
                  />
                ) : (
                  <Option
                    key={part.id}
                    type="checkbox"
                    label={part.label}
                    isChecked={selectedPartIds.includes(part.id)}
                    onChange={() => handleMultiToggle(group, part)}
                    width="19.6rem"
                  />
                )
              )}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
