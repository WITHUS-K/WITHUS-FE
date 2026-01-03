'use client';

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Flex } from '@repo/ui/Flex';
import { TabBar } from '@repo/ui/TabBar';
import { useParams, useSearchParams } from 'next/navigation';
import { useToast } from '@repo/ui/hooks';
import { HTTPError } from 'ky';

import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { mapServerColorToTagHex } from '@web/utils/color';

import { useOrganizationRolesQuery } from '@web/store/query/useOrganizationRolesQuery';
import { useLatestDistributionQuery } from '@web/store/query/useLatestDistribution';
import { useDistributeEvaluators } from '@web/store/mutation/useDistributeEvaluators';
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';

import DistributionContainer, {
  OrgRole,
  PartState,
} from './DistributionContainer/DistributionContainer';

export interface AssignModalContentRef {
  handleConfirm: () => Promise<boolean>;
}

const TABS = ['documents', 'interviews'] as const;

const AssignModalContent = forwardRef<AssignModalContentRef>((_, ref) => {
  const searchParams = useSearchParams();
  const params = useParams();
  const { tab } = params as { tab?: string };

  const initialTab = tab === 'interviews' ? 'interviews' : 'documents';
  const [activeTab, setActiveTab] = useState<'documents' | 'interviews'>(
    initialTab
  );

  useEffect(() => {
    setActiveTab(tab === 'interviews' ? 'interviews' : 'documents');
  }, [tab]);

  const recruitmentId = Number(searchParams.get('recruitmentId'));
  const { organizationId } = getClientSideTokens();

  const toast = useToast();

  // 현재 탭에 맞춰 DOCUMENT/INTERVIEW 로 매핑
  const currentEvalType: 'DOCUMENT' | 'INTERVIEW' =
    activeTab === 'documents' ? 'DOCUMENT' : 'INTERVIEW';

  // 조직 역할(평가자 역할 옵션)
  const { data: rolesData } = useOrganizationRolesQuery({ organizationId });

  const availableRoles: OrgRole[] = useMemo(
    () =>
      (rolesData?.roles ?? []).map((r) => ({
        id: r.id,
        label: r.roleName,
        color: mapServerColorToTagHex(r.color),
      })),
    [rolesData]
  );

  // 최신 분배
  const latestQuery = useLatestDistributionQuery({ recruitmentId });

  // ✅ 모집 상세에서 positions 사용
  const { data: detail } = useRecruitmentDetailQuery({ recruitmentId });

  // 분배 mutation
  const distribute = useDistributeEvaluators(recruitmentId);

  /**
   * ✅ 초기 state 생성
   * - positions가 비어있으면 "공통" 하나만 생성 (positionId: null)
   * - positions가 있으면 roleName 기준 파트 생성 (positionId: pos.id)
   * - latest 분배가 있으면 해당 evalType만 반영하여 덮어쓰기
   */
  const computeInitial = (): Record<string, PartState> => {
    const state: Record<string, PartState> = {};
    const positions = detail?.positions ?? [];

    // ✅ 공통 케이스
    if (positions.length === 0) {
      state['공통'] = {
        roles: [],
        count: 1,
        positionId: null, // ✅ 공통이면 null로 전송
      };

      // latest 분배가 있으면 공통에 반영 (있으면 마지막 값으로 덮어씀)
      if (latestQuery.isSuccess && latestQuery.data) {
        latestQuery.data.assignments
          .filter((a) => a.evaluationType === currentEvalType)
          .forEach((a) => {
            const role = availableRoles.find((r) => r.label === a.organizationRoleName);
            if (!role) return;

            state['공통'] = {
              roles: [role],
              count: a.count,
              positionId: null,
            };
          });
      }

      return state;
    }

    // ✅ 포지션 존재 케이스: roleName으로 파트 구성
    for (const pos of positions) {
      state[pos.roleName] = { roles: [], count: 1, positionId: pos.id };
    }

    // latest 분배 덮어쓰기
    if (latestQuery.isSuccess && latestQuery.data) {
      latestQuery.data.assignments
        .filter((a) => a.evaluationType === currentEvalType)
        .forEach((a) => {
          const part = a.organizationRoleName;

          // 파트명이 positions의 roleName과 매칭되는지 확인
          const matchedPos = positions.find((p) => p.roleName === part);
          if (!matchedPos) return;

          // 선택된 역할(평가자 역할)
          const role = availableRoles.find((r) => r.label === a.organizationRoleName);
          if (!role) return;

          state[part] = {
            roles: [role],
            count: a.count,
            positionId: matchedPos.id,
          };
        });
    }

    return state;
  };

  const [state, setState] = useState<Record<string, PartState> | null>(null);

  // ✅ latest 결과(성공/실패) 뜨면 초기화
  useEffect(() => {
    if (latestQuery.isSuccess || latestQuery.isError) {
      setState(computeInitial());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    latestQuery.isSuccess,
    latestQuery.isError,
    latestQuery.data,
    detail?.recruitmentId,
    detail?.positions?.length,
    currentEvalType,
    JSON.stringify(availableRoles),
  ]);

  // ✅ 탭 바뀌면 재계산
  useEffect(() => {
    setState(computeInitial());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleConfirm = async (): Promise<boolean> => {
    if (!state) return false;

    const assignments = Object.values(state).flatMap((ps) =>
      ps.roles.map((role) => ({
        organizationRoleId: ps.positionId, 
        evaluatorRoleId: role.id,
        evaluationType: currentEvalType,
        count: ps.count,
      }))
    );

    try {
      await distribute.mutateAsync({
        recruitmentId,
        evaluationType: currentEvalType,
        assignments,
      });

      return true;
    } catch (error) {
      if (error instanceof HTTPError && error.response.status === 400) {
        toast.error('해당 파트에 평가자가 충분하지 않습니다.');
      } else {
        toast.error('분배 중 오류가 발생했습니다.');
      }

      console.error('분배 에러:', error);
      return false;
    }
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
        tabs={[...TABS]}
        active={activeTab}
        onChange={(t) => setActiveTab(t as 'documents' | 'interviews')}
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
