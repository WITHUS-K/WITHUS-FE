'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import { HeaderMeta } from '../../ApplyListHeader/ApplyListHeader';
import ActionToolbar from '../../ActionToolbar/ActionToolbar';
import TableContainer from '../../TableContainer/TableContainer';
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from 'next/navigation';
import { MailSideTab } from '../../SideTabs/MailSideTab/MailSideTab';
import { SmsSideTab } from '../../SideTabs/SmsSideTab/SmsSideTab';
import {
  useAdminApplicationsClientQuery,
  type AdminApplicationSortBy,
} from '@web/store/query/useAdminApplicationsQuery';
import { sortByMap, stageMap } from '../../../[tab]/TabClient';
import { mapServerColorToTagHex } from '@web/utils/color';

// ─── 테이블 헤더 정의 ─────────────────────────────────────────────────────────
const DOC_HEADER: HeaderMeta[] = [
  { key: 'checkbox', label: '', width: '4.7rem' },
  { key: 'id', label: '순번', width: '5rem' },
  { key: 'name', label: '이름', width: '8.9rem', sortable: true },
  { key: 'fieldTags', label: '지원 분야', width: '16.8rem', sortable: true },
  {
    key: 'evalStatus',
    label: '서류 평가 현황',
    width: '12.6rem',
    sortable: true,
  },
  { key: 'score', label: '서류 점수', width: '10.5rem', sortable: true },
  { key: 'evaluators', label: '평가 담당자', width: '27rem' },
  { key: 'status', label: '상태', width: '11rem', sortable: true },
  { key: 'smsSent', label: '문자 발송', width: '10.2rem', sortable: true },
  { key: 'mailSent', label: '메일 발송', sortable: true },
];

interface DocumentTabProps {
  recruitmentId: number;
  posColorMap: Record<string, string>;
}

export default function DocumentTab({
  recruitmentId,
  posColorMap,
}: DocumentTabProps) {
  const router = useRouter();
  const params = useParams() as { tab: string };
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = params.tab;
  const side = searchParams.get('sideTab');
  const sideTab = side === 'sms' ? 'sms' : side === 'mail' ? 'mail' : null;

  // ─── 페이지 번호 관리 ────────────────────────────────────────────────────
  const pageQuery = Number(searchParams.get('page'));
  const initialPage = !isNaN(pageQuery) && pageQuery > 0 ? pageQuery - 1 : 0;
  const [page, setPage] = useState(initialPage);
  useEffect(() => {
    if (page !== initialPage) setPage(initialPage);
  }, [initialPage, page]);

  const size = 7;

  // ─── 정렬 키 & 방향 ─────────────────────────────────────────────────────
  const [sortKey, setSortKey] =
    useState<keyof (typeof sortByMap)['documents']>('name');
  const [direction, setDirection] = useState<'ASC' | 'DESC'>('ASC');

  // ─── 요게 포인트: string → AdminApplicationSortBy 캐스팅 ────────────────
  const apiSortBy = sortByMap['documents']![sortKey] as AdminApplicationSortBy;

  // ─── 데이터 패칭 ────────────────────────────────────────────────────────
  const { data, isLoading, isFetching } = useAdminApplicationsClientQuery({
    recruitmentId,
    stage: stageMap[activeTab], // 'DOCUMENT'
    sortBy: apiSortBy, // 캐스팅 덕분에 에러 사라짐
    direction,
    page,
    size,
  });

  // ─── 테이블용 row 생성 ─────────────────────────────────────────────────
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
      evalStatus: `${item.documentEvaluatedCount}/${item.documentAssignedCount}`,
      score: Number(item.documentAverageScore),
      status: (() => {
        switch (item.status) {
          case 'PENDING':
            return '선택';
          case 'DOX_PASS':
            return '서류 합격';
          case 'DOX_FAIL':
            return '서류 불합격';
          case 'DOX_PENDING':
            return '보류';
          case 'INTERVIEW_PASS':
            return '면접 합격';
          case 'INTERVIEW_FAIL':
            return '면접 불합격';
          case 'INTERVIEW_PENDING':
            return '면접 보류';
          default:
            return '선택';
        }
      })(),
      smsSent: item.isSmsSent,
      mailSent: item.isMailSent,
      evaluators: item.documentEvaluators.map((e) => ({
        userId: e.userId,
        name: e.name,
        profileImageUrl: e.profileImageUrl,
        profileColor: e.profileColor,
      })),
    }));
  }, [data, page, size, posColorMap]);

  // ─── 모달 & 선택 로직 ───────────────────────────────────────────────────
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
        headerMeta={DOC_HEADER}
        data={rows}
        availableEvals={[]}
        selectedIds={selectedIds}
        sortState={{ [sortKey]: direction.toLowerCase() as any }}
        onSortChange={(key, dir) => {
          setSortKey(key as keyof (typeof sortByMap)['documents']);
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
