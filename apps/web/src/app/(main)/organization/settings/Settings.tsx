// src/app/(main)/settings/Settings.tsx
'use client';

import { useState, useMemo } from 'react';
import { Flex } from '@repo/ui/Flex';
import SettingsHeader from '../_components/SettingsHeader/SettingsHeader';
import RolePalettePanel from '../_components/RolePalettePanel/RolePalettePanel';
import MemberAssignmentPanel from '../_components/MemberAssignmentPanel/MemberAssignmentPanel';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getOrganizationRolesQueryOptions } from '@web/store/query/useOrganizationRolesQuery';
import { useAddOrganizationRoleMutation } from '@web/store/mutation/useAddOrganizationRoleMutation';
import { useUpdateOrganizationRoleMutation } from '@web/store/mutation/useUpdateOrganizationRoleMutation';
import { nameToHex } from '@web/utils/color';
import { INITIAL_SELECTED } from '@web/constants/organization';
import type { RoleSelectWithCount, User } from '@web/types/organization';
import type { PaletteColor } from '@repo/utils';

interface Props {
  organizationId: number;
}

export default function Settings({ organizationId }: Props) {
  const [searchInput, setSearchInput] = useState('');

  // 1) 전체 역할 목록을 한 번만 가져옴
  const { data } = useSuspenseQuery(
    getOrganizationRolesQueryOptions({ organizationId })
  );

  // 2) 메모리에서 검색어 기준으로 필터링
  const filteredRoles = useMemo(
    () =>
      data.roles.filter((r) =>
        r.roleName.toLowerCase().includes(searchInput.toLowerCase())
      ),
    [data.roles, searchInput]
  );

  // 3) RolePalettePanel 용으로 매핑
  const roleSelect: RoleSelectWithCount[] = filteredRoles.map((r) => ({
    label: r.roleName,
    color: nameToHex[r.color] as PaletteColor,
    count: r.assignedUserCount,
  }));

  // 뮤테이션 훅
  const { mutate: addRole } = useAddOrganizationRoleMutation(organizationId);
  const { mutate: updateRole } =
    useUpdateOrganizationRoleMutation(organizationId);

  // 멤버 할당 상태
  const [addedMembers, setAddedMembers] = useState<User[]>([]);
  const [availableMembers, setAvailableMembers] =
    useState<User[]>(INITIAL_SELECTED);

  const handleAddRole = (newRole: { label: string; color: PaletteColor }) => {
    addRole({ label: newRole.label, color: newRole.color });
  };

  const handleUpdateRole = (
    idx: number,
    label: string,
    color: PaletteColor
  ) => {
    const role = filteredRoles[idx];
    updateRole({ roleId: role!.id, label, color });
  };

  const handleAddMember = (u: User) => {
    setAvailableMembers((av) => av.filter((x) => x.id !== u.id));
    setAddedMembers((ad) => [...ad, u]);
  };
  const handleRemoveMember = (u: User) => {
    setAddedMembers((ad) => ad.filter((x) => x.id !== u.id));
    setAvailableMembers((av) => [...av, u]);
  };

  const handleSave = () => {
    // 저장 API 호출
  };

  return (
    <Flex direction="column">
      <SettingsHeader onSave={handleSave} />

      <Flex align="center" gap="1.9rem" width="100%" marginTop="1.8rem">
        <RolePalettePanel
          roles={roleSelect}
          search={searchInput}
          onSearchChange={setSearchInput}
          onAddRole={handleAddRole}
          onUpdateRole={handleUpdateRole}
        />

        <MemberAssignmentPanel
          addedMembers={addedMembers}
          availableMembers={availableMembers}
          onAdd={handleAddMember}
          onRemove={handleRemoveMember}
        />
      </Flex>
    </Flex>
  );
}
