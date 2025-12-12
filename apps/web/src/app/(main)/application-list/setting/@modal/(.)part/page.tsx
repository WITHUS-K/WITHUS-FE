'use client';

import { useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@repo/ui/Modal';
import { SettingContext } from '../../_context/SettingContext';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useOrganizationRolesQuery } from '@web/store/query/useOrganizationRolesQuery';
import { PartContent } from '../../_components/PartModal/PartContent';
import * as styles from './page.css';

function arraysEqual(a: number[], b: number[]) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
  return true;
}

export default function PartModal() {
  const router = useRouter();
  const close = () => router.back();

  const ctx = useContext(SettingContext)!;

  // ✅ 이제 number[] 입니다 (roleIds)
  const currentRoleIds: number[] = ctx.form.applicationParts?.parts ?? [];

  const { organizationId } = getClientSideTokens();
  const { data: rolesData } = useOrganizationRolesQuery({ organizationId });

  const allRoles = useMemo(
    () =>
      (rolesData?.roles ?? []).map((r) => ({
        id: r.id,
        roleName: r.roleName,
        color: r.color,
      })),
    [rolesData]
  );

  // ✅ 초기 선택값도 그냥 현재 roleIds 그대로
  const initialSelectedIds = useMemo(
    () => currentRoleIds,
    [currentRoleIds]
  );

  const [selectedRoleIds, setSelectedRoleIds] = useState<number[]>(
    () => initialSelectedIds
  );

  useEffect(() => {
    setSelectedRoleIds((prev) =>
      arraysEqual(prev, initialSelectedIds) ? prev : initialSelectedIds
    );
  }, [initialSelectedIds]);

  const toggle = (roleId: number) => {
    setSelectedRoleIds((prev) =>
      prev.includes(roleId)
        ? prev.filter((id) => id !== roleId)
        : [...prev, roleId]
    );
  };

  const confirm = () => {
    // ✅ 서버/폼에 저장할 값은 id 배열 (number[])
    const nextParts = selectedRoleIds;

    ctx.setForm((prev) => ({
      ...prev,
      applicationParts: {
        isSelected: nextParts.length > 0,
        parts: nextParts,
      },
    }));

    close();
  };

  return (
    <Modal.Overlay open onClose={close}>
      <Modal.Layout>
        <Modal.Header text="파트 선택" />
        <Modal.Content>
          <div className={styles.tightRight}>
            <PartContent
              allRoles={allRoles}
              selectedRoleIds={selectedRoleIds}
              onToggle={toggle}
            />
          </div>
        </Modal.Content>
        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="닫기"
            cancelProps={{ onClick: close }}
            confirmText="확인"
            confirmProps={{ onClick: confirm }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
