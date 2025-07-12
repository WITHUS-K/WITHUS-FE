// PartModal.tsx
'use client';
import { useState, useEffect } from 'react';
import { Modal } from '@repo/ui/Modal';
import { CheckBox } from '@repo/ui/CheckBox';
import { Tag } from '@repo/ui/Tag';
import { Flex } from '@repo/ui/Flex';
import { useAssignOrganizationRoleMutation } from '@web/store/mutation/useAssignOrganizationRoleMutation';
import type { OrgRole, RoleDto } from '@web/types/organization';
import { mapServerColorToTagHex } from '@web/utils/color';
import { usePartModalStore } from '@web/store/state/partModalStore';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { PartContent } from '../../_components/PartModal/PartContent';
import { useOrganizationRolesQuery } from '@web/store/query/useOrganizationRolesQuery';

export default function PartModal() {
  const router = useRouter();
  const close = () => router.back();

  const { userId, currentRoles, reset } = usePartModalStore();
  const orgIdRaw = getCookie('organizationId');
  const organizationId = orgIdRaw ? Number(orgIdRaw) : /* 기본값 처리 */ 0;

  const { data: rolesData } = useOrganizationRolesQuery({ organizationId });
  const allRoles =
    rolesData?.roles.map((r) => ({
      roleName: r.roleName,
      color: r.color,
      id: r.id,
    })) ?? [];

  const assignPart = useAssignOrganizationRoleMutation(organizationId);
  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>([]);

  useEffect(() => {
    setSelectedRoleIds(currentRoles.map((r) => r.id));
  }, [currentRoles]);

  const toggle = (roleId: number) => {
    setSelectedRoleIds((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const handleClose = () => {
    reset();
    close();
  };

  if (!userId) return null;
  return (
    <Modal.Overlay open onClose={() => router.back()}>
      <Modal.Layout>
        <Modal.Header text="파트 배정" />
        <Modal.Content>
          <PartContent
            allRoles={allRoles}
            selectedRoleIds={selectedRoleIds}
            onToggle={toggle}
          />
        </Modal.Content>
        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="닫기"
            confirmText="확인"
            cancelProps={{ onClick: close }}
            confirmProps={{
              onClick: () => {
                assignPart.mutate({
                  userId,
                  roleIds: selectedRoleIds,
                });
                handleClose();
              },
            }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
