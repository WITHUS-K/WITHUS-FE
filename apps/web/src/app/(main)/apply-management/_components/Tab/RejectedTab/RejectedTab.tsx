'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { MemberWithEval } from '../../ApplyListItem/ApplyListItem';
import { HeaderMeta } from '../../ApplyListHeader/ApplyListHeader';
import { Flex } from '@repo/ui/Flex';
import ActionToolbar from '../../ActionToolbar/ActionToolbar';
import TableContainer from '../../TableContainer/TableContainer';
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from 'next/navigation';
import { Template } from '../../SideTabs/TemplatesAccordion/TemplatesAccordion';
import { SmsSideTab } from '../../SideTabs/SmsSideTab/SmsSideTab';
import { MailSideTab } from '../../SideTabs/MailSideTab/MailSideTab';
import { useAdminApplicationsQuery } from '@web/store/query/useAdminApplicationsQuery';
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

interface RejectedTabProps {
  recruitmentId: number;
  posColorMap: Record<string, string>;
}

export default function RejectedTab({
  recruitmentId,
  posColorMap,
}: RejectedTabProps) {
  const router = useRouter();
  const params = useParams() as { tab: string };
  const pathname = usePathname();
  const activeTab = params.tab;
  const searchParams = useSearchParams();
  const side = searchParams.get('sideTab');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const sideTab = side === 'sms' ? 'sms' : side === 'mail' ? 'mail' : null;
  const pageQuery = Number(searchParams.get('page'));
  const initialPage = !isNaN(pageQuery) && pageQuery > 0 ? pageQuery - 1 : 0;

  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    if (page !== initialPage) {
      setPage(initialPage);
    }
  }, [initialPage, page]);

  const size = 7;
  const [sortKey, setSortKey] = useState<keyof typeof sortByMap>('name');
  const [direction, setDirection] = useState<'ASC' | 'DESC'>('ASC');

  const { data, isLoading, isFetching } = useAdminApplicationsQuery({
    recruitmentId,
    stage: stageMap[activeTab],
    sortBy: sortByMap[sortKey] as any,
    direction,
    page,
    size,
  });

  const rows = useMemo(() => {
    if (!data) return [];
    return data.data.map((item, idx) => {
      const hex = mapServerColorToTagHex(posColorMap[item.positionName]!);
      return {
        applicationId: item.id,
        id: String(page * size + idx + 1).padStart(3, '0'), // 순번
        name: item.name,
        fieldTags: [
          {
            label: item.positionName,
            color: hex,
          },
        ],
        evalStatus: `${item.documentEvaluatedCount}/${item.documentAssignedCount}`,
        documentScore: Number(item.documentAverageScore),
        interviewScore: Number(item.interviewAverageScore),
        status: '불합격',
        smsSent: item.isSmsSent,
        mailSent: item.isMailSent,
        evaluators: item.documentEvaluators.map((e) => ({
          userId: e.userId,
          profileImageUrl: e.profileImageUrl,
          name: e.name,
          profileColor: e.profileColor,
        })),
      };
    });
  }, [data, page, size, posColorMap]);

  const selectedRows = rows.filter((r) => selectedIds.includes(r.id));
  const applicationIds = selectedRows.map((r) => r.applicationId);
  const recipientNames = selectedRows.map((r) => r.name);

  const setModalParam = (value: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) params.set('sideTab', value);
    else params.delete('sideTab');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCloseSideTab = () => {
    setModalParam(null);
    setSelectedIds([]); // 체크박스 리셋
  };

  const onPageChange = (newPageOneBased: number) => {
    const nextPageZeroBased = newPageOneBased - 1;
    setPage(nextPageZeroBased);
    const qp = new URLSearchParams(Array.from(searchParams.entries()));
    qp.set('page', String(newPageOneBased));
    router.push(`${pathname}?${qp.toString()}`);
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
        communicationOnly={true}
      />

      <TableContainer
        headerMeta={HEADER}
        data={rows}
        selectedIds={selectedIds}
        sortState={{ [sortKey]: direction.toLowerCase() as any }}
        onSortChange={(key: string, dir: 'asc' | 'desc') => {
          setSortKey(key as any);
          setDirection(dir.toUpperCase() as any);
        }}
        currentPage={page + 1}
        totalItems={data?.pagination.totalElements ?? 0}
        pageSize={size}
        onPageChange={onPageChange}
        onToggleAll={(c) => setSelectedIds(c ? rows.map((m) => m.id) : [])}
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
