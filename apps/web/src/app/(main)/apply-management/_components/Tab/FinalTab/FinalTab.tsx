'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from 'next/navigation';
import { MemberWithEval } from '../../ApplyListItem/ApplyListItem';
import { HeaderMeta } from '../../ApplyListHeader/ApplyListHeader';
import { Flex } from '@repo/ui/Flex';
import ActionToolbar from '../../ActionToolbar/ActionToolbar';
import TableContainer from '../../TableContainer/TableContainer';
import { Template } from '../../SideTabs/TemplatesAccordion/TemplatesAccordion';
import { SmsSideTab } from '../../SideTabs/SmsSideTab/SmsSideTab';
import { MailSideTab } from '../../SideTabs/MailSideTab/MailSideTab';
import {
  AdminApplicationSortBy,
  useAdminApplicationsClientQuery,
  useAdminApplicationsQuery,
} from '@web/store/query/useAdminApplicationsQuery';
import { sortByMap, stageMap } from '../../../[tab]/TabClient';
import { mapServerColorToTagHex } from '@web/utils/color';

const HEADER: HeaderMeta[] = [
  { key: 'checkbox', label: '', width: '4.7rem' },
  { key: 'id', label: '순번', width: '5rem' },
  { key: 'name', label: '이름', width: '13.3rem', sortable: true },
  { key: 'fieldTags', label: '지원 분야', width: '22rem', sortable: true },
  {
    key: 'documentScore',
    label: '서류 점수',
    width: '17.2rem',
    sortable: true,
  },
  {
    key: 'InterviewScore',
    label: '면접 점수',
    width: '15.5rem',
    sortable: true,
  },
  { key: 'status', label: '상태', width: '16rem', sortable: true },
  { key: 'smsSent', label: '문자 발송', width: '15rem' },
  { key: 'mailSent', label: '메일 발송' },
];

interface FinalTabProps {
  recruitmentId: number;
  posColorMap: Record<string, string>;
}

type FinalSortKey = keyof (typeof sortByMap)['final'];

export default function FinalTab({
  recruitmentId,
  posColorMap,
}: FinalTabProps) {
  const router = useRouter();
  const params = useParams() as { tab: string };
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = params.tab;
  const side = searchParams.get('sideTab');
  const sideTab = side === 'sms' ? 'sms' : side === 'mail' ? 'mail' : null;

  // 페이지 관리
  const pageParam = Number(searchParams.get('page'));
  const initialPage = !isNaN(pageParam) && pageParam > 0 ? pageParam - 1 : 0;
  const [page, setPage] = useState(initialPage);
  useEffect(() => {
    if (page !== initialPage) setPage(initialPage);
  }, [initialPage]);
  const size = 20;

  // 정렬 키·방향 관리 (URL 동기화)
  const urlSortKey = (searchParams.get('sortKey') as FinalSortKey) ?? 'name';
  const urlDirection =
    (searchParams.get('direction')?.toUpperCase() as 'ASC' | 'DESC') ?? 'ASC';
  const [sortKey, setSortKey] = useState<FinalSortKey>(urlSortKey);
  const [direction, setDirection] = useState<'ASC' | 'DESC'>(urlDirection);
  useEffect(() => {
    setSortKey(urlSortKey);
    setDirection(urlDirection);
  }, [urlSortKey, urlDirection]);

  const apiSortBy = sortByMap['final']![sortKey] as AdminApplicationSortBy;

  // 데이터 패칭
  const { data, isLoading, isFetching } = useAdminApplicationsClientQuery({
    recruitmentId,
    stage: stageMap[activeTab],
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
      documentScore: Number(item.documentAverageScore),
      interviewScore: Number(item.interviewAverageScore),
      status: '최종 합격',
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

  // 선택/모달 처리
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedRows = rows.filter((r) => selectedIds.includes(r.id));
  const applicationIds = selectedRows.map((r) => r.applicationId);
  const recipientNames = selectedRows.map((r) => r.name);

  const setModalParam = (value: string | null) => {
    const qp = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) qp.set('sideTab', value);
    else qp.delete('sideTab');
    router.replace(`${pathname}?${qp.toString()}`);
  };

  const handleCloseSideTab = () => {
    setModalParam(null);
    setSelectedIds([]);
  };

  // 페이지 변경 시 URL 동기화
  const onPageChange = (newOneBased: number) => {
    setPage(newOneBased - 1);
    const qp = new URLSearchParams(Array.from(searchParams.entries()));
    qp.set('page', String(newOneBased));
    qp.set('sortKey', sortKey);
    qp.set('direction', direction.toLowerCase());
    router.replace(`${pathname}?${qp.toString()}`);
  };

  // 정렬 변경 시 URL 동기화
  const handleSortChange = (key: string, dir: 'asc' | 'desc') => {
    const qp = new URLSearchParams(Array.from(searchParams.entries()));
    qp.set('sortKey', key);
    qp.set('direction', dir);
    qp.set('page', '1');
    router.replace(`${pathname}?${qp.toString()}`);
  };

  return (
    <Flex direction="column" width="100%" height="100%" gap="1.2rem">
      <ActionToolbar
        hasSelection={selectedIds.length > 0}
        onSms={() => setModalParam('sms')}
        onMail={() => setModalParam('mail')}
        onDistribute={() => {}}
        onAdd={() =>
          router.push(`/apply-management/add?recruitmentId=${recruitmentId}`)
        }
        communicationOnly
      />

      <TableContainer
        headerMeta={HEADER}
        data={rows as MemberWithEval[]}
        selectedIds={selectedIds}
        sortState={{ [sortKey]: direction.toLowerCase() as any }}
        onSortChange={handleSortChange}
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
