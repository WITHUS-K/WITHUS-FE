'use client';

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { Flex } from '@repo/ui/Flex';
import { TabBar } from '@repo/ui/TabBar';
import { useSearchParams } from 'next/navigation';
import { useOrganizationRolesQuery } from '@web/store/query/useOrganizationRolesQuery';
import { useRecruitmentPositionsQuery } from '@web/store/query/useRecruitmentPositionsQuery';
import { useLatestDistributionQuery } from '@web/store/query/useLatestDistribution';
import { useDistributeEvaluators } from '@web/store/mutation/useDistributeEvaluators';
import { mapServerColorToTagHex } from '@web/utils/color';
import DistributionContainer, {
  OrgRole,
  PartState,
} from './DistributionContainer/DistributionContainer';
import { useUserStore } from '@web/store/state/userStore';

export interface AssignModalContentRef {
  handleConfirm: () => Promise<void>;
}

const TABS = ['documents', 'interviews'];

const AssignModalContent = forwardRef<AssignModalContentRef>((_, ref) => {
  const [activeTab, setActiveTab] =
    useState<(typeof TABS)[number]>('documents');
  const searchParams = useSearchParams();
  const recruitmentId = Number(searchParams.get('recruitmentId'));

  const organizationId = useUserStore.getState().organizationId!;

  const { data: rolesData } = useOrganizationRolesQuery(organizationId);
  const latestQuery = useLatestDistributionQuery(recruitmentId);
  const positionsQuery = useRecruitmentPositionsQuery(recruitmentId);
  const distribute = useDistributeEvaluators(recruitmentId);

  const availableRoles: OrgRole[] = (rolesData?.roles ?? []).map((r) => ({
    id: r.id,
    label: r.roleName,
    color: mapServerColorToTagHex(r.color),
  }));
  console.log('안녕', availableRoles);

  // 현재 탭에 맞춰 DOCUMENT/INTERVIEW 로 매핑
  const currentEvalType: 'DOCUMENT' | 'INTERVIEW' =
    activeTab === 'documents' ? 'DOCUMENT' : 'INTERVIEW';

  const computeInitial = (): Record<string, PartState> => {
    const state: Record<string, PartState> = {};
    const positions = positionsQuery.data;
    if (!positions) return state;

    // 1) 모든 포지션 기본 세팅
    for (const pos of positions) {
      state[pos.name] = { roles: [], count: 1, positionId: pos.id };
    }

    // 2) latest 분배 불러왔으면, 현재 탭 타입에 맞는 assignment만 덮어쓰기
    if (latestQuery.isSuccess && latestQuery.data) {
      latestQuery.data.assignments
        .filter((a) => a.evaluationType === currentEvalType)
        .forEach((a) => {
          const part = a.positionName;
          const role = availableRoles.find(
            (r) => r.label === a.organizationRoleName
          );
          if (!role) return;
          state[part] = {
            roles: [role],
            count: a.count,
            positionId: positions.find((p) => p.name === part)!.id,
          };
        });
    }

    return state;
  };

  const [state, setState] = useState<Record<string, PartState> | null>(null);

  // positions/latest 완료 시 초기화
  useEffect(() => {
    if (
      !positionsQuery.isLoading &&
      (latestQuery.isSuccess || latestQuery.isError)
    ) {
      setState(computeInitial());
    }
  }, [
    positionsQuery.isLoading,
    latestQuery.isSuccess,
    latestQuery.isError,
    positionsQuery.data,
    latestQuery.data,
    JSON.stringify(availableRoles),
    currentEvalType, // 탭 바뀌면 재계산
  ]);

  // 탭 바뀔 때도 초기화
  useEffect(() => {
    setState(computeInitial());
  }, [activeTab]);

  const handleConfirm = async () => {
    if (!state) return;
    const assignments = Object.values(state).flatMap((ps) =>
      ps.roles.map((role) => ({
        positionId: ps.positionId,
        organizationRoleId: role.id,
        evaluationType: currentEvalType,
        count: ps.count,
      }))
    );
    await distribute.mutateAsync({ recruitmentId, assignments });
  };

  useImperativeHandle(ref, () => ({ handleConfirm }), [state, activeTab]);

  if (state === null) {
    return <Flex justify="center">로딩 중...</Flex>;
  }

  const onRoleSelect = (part: string, role: OrgRole) => {
    setState((prev) => ({
      ...prev!,
      [part]: {
        ...prev![part]!,
        roles: [role],
      },
    }));
  };

  const onCountChange = (part: string, next: number) => {
    setState((prev) => ({
      ...prev!,
      [part]: {
        ...prev![part]!,
        count: Math.max(1, next),
      },
    }));
  };

  return (
    <Flex direction="column" gap="4rem" width="100%">
      <TabBar
        tabs={TABS}
        active={activeTab}
        onChange={(t) => setActiveTab(t as any)}
      />
      <DistributionContainer
        parts={Object.keys(state)}
        availableRoles={availableRoles}
        value={state}
        onRoleSelect={onRoleSelect}
        onCountChange={onCountChange}
      />
    </Flex>
  );
});

export default AssignModalContent;
