'use client';

import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { Button } from '@repo/ui/Button';
import { CheckBox } from '@repo/ui/CheckBox';
import { Flex } from '@repo/ui/Flex';
import { Tag } from '@repo/ui/Tag';
import { Text } from '@repo/ui/Text';
import { useToast } from '@repo/ui/hooks';
import { mapServerColorToTagHex } from '@web/utils/color';
import { useCreateOrganizationRoleGroupMutation } from '@web/store/mutation/useCreateOrganizationRoleGroupMutation';
import { useAssignOrganizationRoleGroupRolesMutation } from '@web/store/mutation/useAssignOrganizationRoleGroupRolesMutation';
import type { OrganizationRoleGroup, RoleDto } from '@web/types/organization';
import * as styles from './RoleGroupPanel.css';

type Props = {
  organizationId: number;
  roles: RoleDto[];
  groups: OrganizationRoleGroup[];
};

export default function RoleGroupPanel({ organizationId, roles, groups }: Props) {
  const toast = useToast();
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);
  const [groupName, setGroupName] = useState('');
  const [minCount, setMinCount] = useState(1);
  const [maxCount, setMaxCount] = useState(1);

  const createGroup = useCreateOrganizationRoleGroupMutation(organizationId);
  const assignRoles = useAssignOrganizationRoleGroupRolesMutation(organizationId);

  const selectedGroup = useMemo(
    () => groups.find((group) => group.id === selectedGroupId) ?? null,
    [groups, selectedGroupId]
  );

  const roleGroupNameByRoleId = useMemo(() => {
    const map = new Map<number, string>();
    groups.forEach((group) => {
      group.roles.forEach((role) => map.set(role.id, group.name));
    });
    return map;
  }, [groups]);

  useEffect(() => {
    if (selectedGroupId === null && groups.length > 0) {
      setSelectedGroupId(groups[0]!.id);
    }
  }, [groups, selectedGroupId]);

  useEffect(() => {
    setSelectedRoleIds(selectedGroup?.roles.map((role) => role.id) ?? []);
  }, [selectedGroup]);

  const handleCreateGroup = () => {
    const name = groupName.trim();
    if (!name) {
      toast.error('그룹명을 입력해주세요.');
      return;
    }
    if (minCount > maxCount) {
      toast.error('최소 선택 개수는 최대 선택 개수보다 클 수 없습니다.');
      return;
    }

    createGroup.mutate(
      {
        name,
        selectionMinCount: minCount,
        selectionMaxCount: maxCount,
      },
      {
        onSuccess: (group) => {
          setGroupName('');
          setMinCount(1);
          setMaxCount(1);
          setSelectedGroupId(group.id);
          toast.success(`${group.name} 그룹이 생성되었습니다.`);
        },
        onError: () => toast.error('역할 그룹 생성에 실패했습니다.'),
      }
    );
  };

  const toggleRole = (roleId: number) => {
    setSelectedRoleIds((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleSaveRoles = () => {
    if (!selectedGroup) return;
    if (selectedRoleIds.length === 0) {
      toast.error('그룹에 포함할 파트를 1개 이상 선택해주세요.');
      return;
    }

    assignRoles.mutate(
      { groupId: selectedGroup.id, roleIds: selectedRoleIds },
      {
        onSuccess: () => toast.success('역할 그룹에 파트가 저장되었습니다.'),
        onError: () => toast.error('역할 그룹 저장에 실패했습니다.'),
      }
    );
  };

  return (
    <section className={styles.root}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <Flex align="center" gap="0.8rem">
            <Text variant="md1_text_semibold">역할 그룹</Text>
            <Text variant="md1_text_medium" color="grayscale30">
              {groups.length}
            </Text>
          </Flex>
        </div>

        <div className={styles.createBox}>
          <label className={styles.field}>
            <Text variant="sm_caption_medium" color="grayscale60">그룹명</Text>
            <input
              className={styles.input}
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
              placeholder="운영진 팀"
            />
          </label>
          <label className={styles.field}>
            <Text variant="sm_caption_medium" color="grayscale60">최소</Text>
            <input
              className={styles.input}
              type="number"
              min={0}
              value={minCount}
              onChange={(event) => setMinCount(Number(event.target.value))}
            />
          </label>
          <label className={styles.field}>
            <Text variant="sm_caption_medium" color="grayscale60">최대</Text>
            <input
              className={styles.input}
              type="number"
              min={1}
              value={maxCount}
              onChange={(event) => setMaxCount(Number(event.target.value))}
            />
          </label>
        </div>

        <Button
          size="40"
          variant="basic"
          width="100%"
          onClick={handleCreateGroup}
          isLoading={createGroup.isPending}
          loadingText="생성 중"
        >
          그룹 추가
        </Button>

        <div className={styles.groupList}>
          {groups.map((group) => (
            <button
              key={group.id}
              type="button"
              className={clsx(
                styles.groupItem,
                selectedGroupId === group.id && styles.selectedGroupItem
              )}
              onClick={() => setSelectedGroupId(group.id)}
            >
              <Text variant="md2_text_semibold" color="grayscale90">
                {group.name}
              </Text>
              <Text variant="sm_caption_regular" color="grayscale50">
                {group.roles.length}개 파트 · {group.selectionMinCount}~{group.selectionMaxCount}개 선택
              </Text>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.panel}>
        <div className={styles.header}>
          <Flex direction="column" gap="0.4rem">
            <Text variant="md1_text_semibold">
              {selectedGroup ? `${selectedGroup.name} 파트 구성` : '파트 구성'}
            </Text>
            <Text variant="sm_caption_regular" color="grayscale50">
              {selectedRoleIds.length}개 선택됨
            </Text>
          </Flex>
          <Button
            size="40"
            width="12rem"
            onClick={handleSaveRoles}
            disabled={!selectedGroup || roles.length === 0}
            isLoading={assignRoles.isPending}
            loadingText="저장 중"
          >
            저장
          </Button>
        </div>

        {roles.length === 0 ? (
          <div className={styles.empty}>
            <Text variant="md2_text_medium" color="grayscale50">
              먼저 왼쪽 파트 목록에서 파트를 생성해주세요.
            </Text>
          </div>
        ) : !selectedGroup ? (
          <div className={styles.empty}>
            <Text variant="md2_text_medium" color="grayscale50">
              역할 그룹을 선택해주세요.
            </Text>
          </div>
        ) : (
          <div className={styles.roleList}>
            {roles.map((role) => {
              const assignedGroupName = roleGroupNameByRoleId.get(role.id);
              return (
                <div key={role.id} className={styles.roleItem}>
                  <div className={styles.roleMeta}>
                    <Tag withCircle color={mapServerColorToTagHex(role.color)}>
                      {role.roleName}
                    </Tag>
                    {assignedGroupName && assignedGroupName !== selectedGroup.name && (
                      <Text variant="sm_caption_regular" color="grayscale40">
                        현재 {assignedGroupName}
                      </Text>
                    )}
                  </div>
                  <CheckBox
                    isChecked={selectedRoleIds.includes(role.id)}
                    onChange={() => toggleRole(role.id)}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
