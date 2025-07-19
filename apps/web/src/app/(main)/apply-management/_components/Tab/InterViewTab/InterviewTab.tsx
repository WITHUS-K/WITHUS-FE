'use client';

import React, { useEffect, useMemo, useState } from 'react';
import TableContainer from '../../TableContainer/TableContainer';
import ActionToolbar from '../../ActionToolbar/ActionToolbar';
import { Flex } from '@repo/ui/Flex';
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from 'next/navigation';
import { MailSideTab } from '../../SideTabs/MailSideTab/MailSideTab';
import { SmsSideTab } from '../../SideTabs/SmsSideTab/SmsSideTab';
import { sortByMap, stageMap } from '../../../[tab]/TabClient';
import {
  useAdminApplicationsClientQuery,
  type AdminApplicationSortBy,
} from '@web/store/query/useAdminApplicationsQuery';
import { mapServerColorToTagHex } from '@web/utils/color';
import { HeaderMeta } from '../../ApplyListHeader/ApplyListHeader';

// 인터뷰 탭 헤더 정의
const INT_HEADER: HeaderMeta[] = [
  { key: 'checkbox', label: '', width: '4.7rem' },
  { key: 'id', label: '순번', width: '5rem' },
  { key: 'name', label: '이름', width: '8.9rem', sortable: true },
  { key: 'fieldTags', label: '지원 분야', width: '16.8rem', sortable: true },
  {
    key: 'evalStatus',
    label: '면접 평가 현황',
    width: '12.6rem',
    sortable: true,
  },
  { key: 'score', label: '면접 점수', width: '10.5rem', sortable: true },
  { key: 'evaluators', label: '평가 담당자', width: '27rem' },
  { key: 'status', label: '상태', width: '11rem', sortable: true },
  { key: 'smsSent', label: '문자 발송', width: '10.2rem', sortable: true },
  { key: 'mailSent', label: '메일 발송', sortable: true },
];

interface InterviewTabProps {
  recruitmentId: number;
  posColorMap: Record<string, string>;
}

// sortByMap['interviews'] 의 키만 허용
type InterviewSortKey = keyof (typeof sortByMap)['interviews'];

export default function InterviewTab({
  recruitmentId,
  posColorMap,
}: InterviewTabProps) {
  const router = useRouter();
  const params = useParams() as { tab: string };
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = params.tab;
  const side = searchParams.get('sideTab');
  const sideTab = side === 'sms' ? 'sms' : side === 'mail' ? 'mail' : null;

  // 페이지 관리
  const pageQuery = Number(searchParams.get('page'));
  const initialPage = !isNaN(pageQuery) && pageQuery > 0 ? pageQuery - 1 : 0;
  const [page, setPage] = useState(initialPage);
  useEffect(() => {
    if (page !== initialPage) setPage(initialPage);
  }, [initialPage, page]);
  const size = 20;

  // 정렬 상태
  const [sortKey, setSortKey] = useState<InterviewSortKey>('name');
  const [direction, setDirection] = useState<'ASC' | 'DESC'>('ASC');

  // 올바른 API sortBy 값 추출 및 캐스팅
  const apiSortBy = sortByMap['interviews']![sortKey] as AdminApplicationSortBy;

  // 데이터 패칭
  const { data, isLoading, isFetching } = useAdminApplicationsClientQuery({
    recruitmentId,
    stage: stageMap[activeTab], // 'INTERVIEW'
    sortBy: apiSortBy,
    direction,
    page,
    size,
  });

  // 테이블 row 생성
  const rows = useMemo(() => {
    if (!data) return [];
    return data.data.map((item, idx) => ({
      applicationId: item.id,
      id: String(page * size + idx + 1).padStart(3, '0'),
      name: item.name,
      fieldTags: [
        {
          label: item.positionName,
          color: mapServerColorToTagHex(posColorMap[item.positionName]!),
        },
      ],
      evalStatus: `${item.interviewEvaluatedCount}/${item.interviewAssignedCount}`,
      score: Number(item.interviewAverageScore),
      status: (() => {
        switch (item.status) {
          case 'INTERVIEW_PENDING':
            return '보류';
          case 'INTERVIEW_PASS':
            return '면접 합격';
          case 'INTERVIEW_FAIL':
            return '면접 불합격';
          default:
            return '선택';
        }
      })(),
      smsSent: item.isSmsSent,
      mailSent: item.isMailSent,
      evaluators: item.interviewEvaluators.map((e) => ({
        userId: e.userId,
        name: e.name,
        profileImageUrl: e.profileImageUrl,
        profileColor: e.profileColor,
      })),
    }));
  }, [data, page, size, posColorMap]);

  // 선택/모달 처리
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const applicationIds = rows
    .filter((r) => selectedIds.includes(r.id))
    .map((r) => r.applicationId);
  const recipientNames = rows
    .filter((r) => selectedIds.includes(r.id))
    .map((r) => r.name);

  const setModalParam = (value: string | null) => {
    const qp = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) qp.set('sideTab', value);
    else qp.delete('sideTab');
    router.push(`${pathname}?${qp.toString()}`);
  };

  const openAssignManagerModal = () =>
    router.push(
      `/apply-management/${activeTab}/assign-manager?recruitmentId=${recruitmentId}`
    );
  const handleCloseSideTab = () => {
    setModalParam(null);
    setSelectedIds([]);
  };
  const onPageChange = (newOneBased: number) => {
    const zeroBased = newOneBased - 1;
    setPage(zeroBased);
    const qp = new URLSearchParams(Array.from(searchParams.entries()));
    qp.set('page', String(newOneBased));
    router.push(`${pathname}?${qp.toString()}`);
  };

  return (
    <Flex direction="column" width="100%" height="100%" gap="1.2rem">
      <ActionToolbar
        hasSelection={selectedIds.length > 0}
        onSms={() => setModalParam('sms')}
        onMail={() => setModalParam('mail')}
        onDistribute={openAssignManagerModal}
        onAdd={() =>
          router.push(`/apply-management/add?recruitmentId=${recruitmentId}`)
        }
      />

      <TableContainer
        headerMeta={INT_HEADER}
        data={rows}
        availableEvals={[]}
        selectedIds={selectedIds}
        sortState={{ [sortKey]: direction.toLowerCase() as any }}
        onSortChange={(key, dir) => {
          setSortKey(key as InterviewSortKey);
          setDirection(dir.toUpperCase() as 'ASC' | 'DESC');
        }}
        currentPage={page + 1}
        totalItems={data?.pagination.totalElements ?? 0}
        pageSize={size}
        onPageChange={onPageChange}
        onToggleAll={(c) => setSelectedIds(c ? rows.map((r) => r.id) : [])}
        onToggleOne={(id, checked) =>
          setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((x) => x !== id)
          )
        }
        isLoading={isLoading}
        isFetching={isFetching}
      />

      {sideTab === 'sms' && (
        <SmsSideTab
          applicationIds={applicationIds}
          recipients={recipientNames}
          onClose={handleCloseSideTab}
        />
      )}
      {sideTab === 'mail' && (
        <MailSideTab
          applicationIds={applicationIds}
          recipients={recipientNames}
          onClose={handleCloseSideTab}
        />
      )}
    </Flex>
  );
}
