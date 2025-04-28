'use client';

import { Flex } from '@repo/ui/Flex';
import SettingsHeader from '../_components/SettingsHeader/SettingsHeader';
import RolePalettePanel from '../_components/RolePalettePanel/RolePalettePanel';
import { Role, RoleSelect, User } from '@web/types/organization';
import { useState } from 'react';
import { ALL_ROLES, INITIAL_SELECTED } from '@web/constants/organization';

export default function SettingsPage() {
  // 역할 목록
  const [roles, setRoles] = useState<RoleSelect[]>(ALL_ROLES);

  // “추가된 멤버” & “추가하지 않은 멤버”
  const [added, setAdded] = useState<User[]>([]);
  const [available, setAvailable] = useState<User[]>(INITIAL_SELECTED);

  // Role 팔레트 → 역할 추가
  const handleAddRole = (newRole: RoleSelect) => setRoles([...roles, newRole]);

  // Role 이름 수정
  const handleUpdateRole = (idx: number, label: string) => {
    setRoles((prev) => {
      if (idx < 0 || idx >= prev.length) return prev;
      return prev.map((r, i) => (i === idx ? { ...r, label } : r));
    });
  };

  // 멤버 할당: 역할별 필터링은 예시로 “added” 에만 반영
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
      </Flex>
    </Flex>
  );
}
