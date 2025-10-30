'use client';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { Flex } from '@repo/ui/Flex';
import SettingsHeader from '../_components/SettingsHeader/SettingsHeader';
import RolePalettePanel, {
  colorHexToNameMap,
} from '../_components/RolePalettePanel/RolePalettePanel';
import MemberAssignmentPanel from '../_components/MemberAssignmentPanel/MemberAssignmentPanel';
import { hexToName, nameToHex } from '@web/utils/color';
import type { RoleSelectWithCount, UserResult } from '@web/types/organization';
import type { PaletteColor } from '@repo/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getOrganizationRolesQueryOptions } from '@web/store/query/useOrganizationRolesQuery';
import {
  useOrganizationUsersClientQuery,
  useOrganizationUsersQuery,
} from '@web/store/query/useOrganizationUsersQuery';
import { useAddOrganizationRoleMutation } from '@web/store/mutation/useAddOrganizationRoleMutation';
import { useUpdateOrganizationRoleMutation } from '@web/store/mutation/useUpdateOrganizationRoleMutation';
import { useAssignOrganizationUsersMutation } from '@web/store/mutation/useAssignOrganizationUsersMutation';
import { useToast } from '@repo/ui/hooks';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

interface Props {
  organizationId: number;
}

export default function Settings({ organizationId }: Props) {
  const [roleSearch, setRoleSearch] = useState('');
  const [selectedRoleIdx, setSelectedRoleIdx] = useState<number | null>(null);

  const toast = useToast();

  // 역할 목록
  const { data: rolesData } = useSuspenseQuery(
    getOrganizationRolesQueryOptions({ organizationId })
  );

  const filteredRoles = useMemo(
    () =>
      rolesData.roles.filter((r) =>
        r.roleName.toLowerCase().includes(roleSearch.toLowerCase())
      ),
    [rolesData.roles, roleSearch]
  );
  const roleSelect: (RoleSelectWithCount & { id: number })[] =
    filteredRoles.map((r) => ({
      id: r.id,
      label: r.roleName,
      color: nameToHex[r.color] as PaletteColor,
      count: r.assignedUserCount,
    }));

  const selectedRoleId =
    selectedRoleIdx != null ? filteredRoles[selectedRoleIdx]!.id : 0;
  const selectedRoleName =
    selectedRoleIdx != null ? filteredRoles[selectedRoleIdx]!.roleName : '';

  // 현재 로그인한 사용자 ID
  const { userId: myUserId } = getClientSideTokens();

  // 서버에서 users
  const { data: users } = useOrganizationUsersClientQuery({
    organizationId,
    roleId: selectedRoleId,
  });

  // roleId 가 바뀔 때만 초기화
  const [localUsers, setLocalUsers] = useState<UserResult[]>([]);
  useEffect(() => {
    if (selectedRoleId === 0) {
      setLocalUsers([]);
    } else if (users) {
      setLocalUsers(users);
    }
  }, [selectedRoleId, users]);

  const addedMembers = localUsers.filter((u) => u.isAssigned);
  const availableMembers = localUsers.filter(
    (u) => !u.isAssigned && u.userId !== myUserId
  );

  //  즉시 UI 반영
  const handleAdd = (u: UserResult) =>
    setLocalUsers((ls) =>
      ls.map((x) => (x.userId === u.userId ? { ...x, isAssigned: true } : x))
    );
  const handleRemove = (u: UserResult) =>
    setLocalUsers((ls) =>
      ls.map((x) => (x.userId === u.userId ? { ...x, isAssigned: false } : x))
    );

  // 역할
  const { mutate: addRole } = useAddOrganizationRoleMutation(organizationId);
  const { mutate: updateRole } =
    useUpdateOrganizationRoleMutation(organizationId);

  //  할당/제외
  const { mutate: assignUsers } =
    useAssignOrganizationUsersMutation(organizationId);

  // 저장, 비어 있으면 [0] 전송
  const handleSave = () => {
    if (!selectedRoleId) return;
    const userIds =
      addedMembers.length > 0 ? addedMembers.map((u) => u.userId) : [0];
    assignUsers(
      { roleId: selectedRoleId, userIds },
      {
        onSuccess: () => {
          const count = addedMembers.length;
          toast.success(
            `${count}명의 멤버가 ${selectedRoleName}에 추가되었습니다.`
          );
        },
      }
    );
  };

  return (
    <Suspense fallback={null}>
      <Flex direction="column" width="100%" height="100%">
        <SettingsHeader onSave={handleSave} />
        <Flex align="center" gap="1.9rem" width="100%" marginTop="1.8rem">
          <RolePalettePanel
            organizationId={organizationId}
            roles={roleSelect}
            search={roleSearch}
            selectedIdx={selectedRoleIdx}
            onSearchChange={setRoleSearch}
            onSelectRole={setSelectedRoleIdx}
            onAddRole={addRole}
            onUpdateRole={(idx, newLabel, newColorKey) => {
              const orig = filteredRoles[idx]!;

              const key = newColorKey === 'gray' ? orig.color : newColorKey;
              const finalColorName = key.startsWith('#')
                ? (hexToName[key] ?? orig.color)
                : key;

              updateRole({
                roleId: orig.id,
                label: newLabel,
                color: finalColorName,
              });
            }}
          />
          <MemberAssignmentPanel
            addedMembers={addedMembers}
            availableMembers={availableMembers}
            onAdd={handleAdd}
            onRemove={handleRemove}
            showBulkControls={selectedRoleIdx !== null}
          />
        </Flex>
      </Flex>
    </Suspense>
  );
}
