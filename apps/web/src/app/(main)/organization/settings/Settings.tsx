'use client';

import { Flex } from '@repo/ui/Flex';
import SettingsHeader from '../_components/SettingsHeader/SettingsHeader';
import RolePalettePanel from '../_components/RolePalettePanel/RolePalettePanel';
import {
  Role,
  RoleSelect,
  RoleSelectWithCount,
  User,
} from '@web/types/organization';
import { useState } from 'react';
import { ALL_ROLES, INITIAL_SELECTED } from '@web/constants/organization';
import MemberAssignmentPanel from '../_components/MemberAssignmentPanel/MemberAssignmentPanel';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getOrganizationRolesQueryOptions } from '@web/store/query/useOrganizationRolesQuery';
import { useAddOrganizationRoleMutation } from '@web/store/mutation/useAddOrganizationRoleMutation';
import { PaletteColor } from '@repo/utils';
import { hexToName, nameToHex } from '@web/utils/color';

interface Props {
  organizationId: number;
}

export default function Settings({ organizationId }: Props) {
  const { data } = useSuspenseQuery(
    getOrganizationRolesQueryOptions({ organizationId })
  );

  const { mutate: addRole } = useAddOrganizationRoleMutation(organizationId);
  // 역할 목록
  //const [roles, setRoles] = useState<RoleSelect[]>(ALL_ROLES);

  // “추가된 멤버” & “추가하지 않은 멤버”
  const [added, setAdded] = useState<User[]>([]);
  const [available, setAvailable] = useState<User[]>(INITIAL_SELECTED);

  // Role 팔레트 → 역할 추가
  const handleAddRole = (newRole: { label: string; color: PaletteColor }) => {
    addRole({
      label: newRole.label,
      color: newRole.color,
    });
  };

  // Role 이름 수정
  /*const handleUpdateRole = (
    idx: number,
    label: string,
    color: RoleSelect['color']
  ) => {
    setRoles((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], label, color };
      return copy;
    });
  };*/
  const handleUpdateRole = (idx: number, label: string, color: string) => {
    // TODO: 역할 수정 API 필요 시 연동
    console.log('update role', idx, label, color);
  };

  const handleAddMember = (u: User) => {
    setAvailable((av) => av.filter((x) => x.id !== u.id));
    setAdded((ad) => [...ad, u]);
  };
  const handleRemoveMember = (u: User) => {
    setAdded((ad) => ad.filter((x) => x.id !== u.id));
    setAvailable((av) => [...av, u]);
  };

  const handleSave = () => {
    // 저장 API
  };

  const roleSelect: RoleSelectWithCount[] = data.roles.map((r) => ({
    label: r.roleName,
    color: nameToHex[r.color] as PaletteColor,
    count: r.assignedUserCount,
  }));

  return (
    <Flex direction="column">
      <SettingsHeader onSave={handleSave} />
      <Flex align="center" gap="1.9rem" width="100%" marginTop="1.8rem">
        <RolePalettePanel
          roles={roleSelect}
          onAddRole={handleAddRole}
          onUpdateRole={handleUpdateRole}
        />

        <MemberAssignmentPanel
          addedMembers={added}
          availableMembers={available}
          onAdd={handleAddMember}
          onRemove={handleRemoveMember}
        />
      </Flex>
    </Flex>
  );
}
