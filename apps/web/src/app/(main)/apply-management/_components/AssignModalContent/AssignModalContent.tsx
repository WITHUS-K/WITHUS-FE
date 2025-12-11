'use client';

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from 'react';
import { Flex } from '@repo/ui/Flex';
import { TabBar } from '@repo/ui/TabBar';
import { useParams, useSearchParams } from 'next/navigation';
import { useOrganizationRolesQuery } from '@web/store/query/useOrganizationRolesQuery';
import { useRecruitmentPositionsQuery } from '@web/store/query/useRecruitmentPositionsQuery';
import { useLatestDistributionQuery } from '@web/store/query/useLatestDistribution';
import { useDistributeEvaluators } from '@web/store/mutation/useDistributeEvaluators';
import { mapServerColorToTagHex } from '@web/utils/color';
import DistributionContainer, {
  OrgRole,
  PartState,
} from './DistributionContainer/DistributionContainer';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useToast } from '@repo/ui/hooks';
import { HTTPError } from 'ky';

export interface AssignModalContentRef {
  handleConfirm: () => Promise<boolean>;
}

const TABS = ['documents', 'interviews'];

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

  const { data: rolesData } = useOrganizationRolesQuery({ organizationId });
  const latestQuery = useLatestDistributionQuery({ recruitmentId });
  const positionsQuery = useRecruitmentPositionsQuery(recruitmentId);
  console.log("포지션", positionsQuery.data)
  const distribute = useDistributeEvaluators(recruitmentId);

  const toast = useToast();

  const availableRoles: OrgRole[] = (rolesData?.roles ?? []).map((r) => ({
    id: r.id,
    label: r.roleName,
    color: mapServerColorToTagHex(r.color),
  }));

  /*if (distribute === null) {
    // 404(분배 데이터 없음)인 경우
    return <div>아직 최신 분배 정보가 없습니다.</div>;
  }*/

  // 현재 탭에 맞춰 DOCUMENT/INTERVIEW 로 매핑
  const currentEvalType: 'DOCUMENT' | 'INTERVIEW' =
    activeTab === 'documents' ? 'DOCUMENT' : 'INTERVIEW';

  const computeInitial = (): Record<string, PartState> => {
  const state: Record<string, PartState> = {};
  const positions = positionsQuery.data;

  // 포지션이 없거나 length가 0이면 "공통" 하나만 생성
  if (!positions || positions.length === 0) {
    state['공통'] = {
      roles: [],
      count: 1,
      // TODO: 백엔드와 약속된 공통용 positionId가 있다면 그 값으로 변경
      positionId: -1,
    };
    return state;
  }

  // 포지션이 있을 때: 기존 로직 유지
  for (const pos of positions) {
    state[pos.name] = { roles: [], count: 1, positionId: pos.id };
  }

  // latest 분배 불러왔으면, 현재 탭 타입에 맞는 assignment만 덮어쓰기
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

  const handleConfirm = async (): Promise<boolean> => {
    if (!state) return false;

    const assignments = Object.values(state).flatMap((ps) =>
      ps.roles.map((role) => ({
        positionId: ps.positionId,
        organizationRoleId: role.id,
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
