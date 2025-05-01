'use client';

import { Flex } from '@repo/ui/Flex';
import SettingsHeader from '../_components/SettingsHeader/SettingsHeader';
import RolePalettePanel from '../_components/RolePalettePanel/RolePalettePanel';
import { Role, RoleSelect, User } from '@web/types/organization';
import { useState } from 'react';
import { ALL_ROLES, INITIAL_SELECTED } from '@web/constants/organization';
import MemberAssignmentPanel from '../_components/MemberAssignmentPanel/MemberAssignmentPanel';

export default function SettingsPage() {
  // 역할 목록
  const [roles, setRoles] = useState<RoleSelect[]>(ALL_ROLES);

  // “추가된 멤버” & “추가하지 않은 멤버”
  const [added, setAdded] = useState<User[]>([]);
  const [available, setAvailable] = useState<User[]>(INITIAL_SELECTED);

  // Role 팔레트 → 역할 추가
  const handleAddRole = (newRole: RoleSelect) => setRoles([...roles, newRole]);

  // Role 이름 수정
  const handleUpdateRole = (
    idx: number,
    label: string,
    color: RoleSelect['color']
  ) => {
    setRoles((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], label, color };
      return copy;
    });
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

  return (
    <Flex direction="column">
      <SettingsHeader onSave={handleSave} />
      <Flex align="center" gap="1.9rem" width="100%" marginTop="1.8rem">
        <RolePalettePanel
          roles={roles}
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
