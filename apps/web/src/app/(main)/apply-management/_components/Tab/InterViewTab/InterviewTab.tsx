'use client';

import React, { useMemo, useState } from 'react';
import { Evaluator } from '../../EvalBubbles/EvalBubbles';
import { MemberWithEval } from '../../ApplyListItem/ApplyListItem';
import { HeaderMeta } from '../../ApplyListHeader/ApplyListHeader';
import TableContainer from '../../TableContainer/TableContainer';
import ActionToolbar from '../../ActionToolbar/ActionToolbar';
import { Flex } from '@repo/ui/Flex';
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from 'next/navigation';
import { Template } from '../../SideTabs/TemplatesAccordion/TemplatesAccordion';
import { MailSideTab } from '../../SideTabs/MailSideTab/MailSideTab';
import { SmsSideTab } from '../../SideTabs/SmsSideTab/SmsSideTab';
import { sortByMap, stageMap } from '../../../[tab]/TabClient';
import { useAdminApplicationsQuery } from '@web/store/query/useAdminApplicationsQuery';
import { mapServerColorToTagHex } from '@web/utils/color';

const INT_HEADER: HeaderMeta[] = [
  { key: 'checkbox', label: '', width: '4.7rem' },
  { key: 'id', label: '순번', width: '5rem' },
  { key: 'name', label: '이름', width: '8.9rem', sortable: true },
  { key: 'fieldTags', label: '지원 분야', width: '16.8rem' },
  {
    key: 'evalStatus',
    label: '면접 평가 현황',
    width: '12.6rem',
    sortable: true,
  },
  { key: 'score', label: '면접 점수', width: '10.5rem', sortable: true },
  { key: 'evaluators', label: '평가 담당자', width: '27rem' },
  { key: 'status', label: '상태', width: '11rem', sortable: true },
  { key: 'smsSent', label: '문자 발송', width: '10.2rem' },
  { key: 'mailSent', label: '메일 발송' },
];

interface InterviewTabProps {
  recruitmentId: number;
  posColorMap: Record<string, string>;
}

export default function InterviewTab({
  recruitmentId,
  posColorMap,
}: InterviewTabProps) {
  const router = useRouter();
  const params = useParams() as { tab: string };
  const pathname = usePathname();
  const activeTab = params.tab;
  const searchParams = useSearchParams();
  const side = searchParams.get('sideTab');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const sideTab = side === 'sms' ? 'sms' : side === 'mail' ? 'mail' : null;

  const [page, setPage] = useState(0);
  const size = 7;
  const [sortKey, setSortKey] = useState<keyof typeof sortByMap>('name');
  const [direction, setDirection] = useState<'ASC' | 'DESC'>('ASC');

  const { data, isLoading } = useAdminApplicationsQuery({
    recruitmentId,
    stage: stageMap[activeTab],
    sortBy: sortByMap[sortKey] as any,
    direction,
    page: page,
    size,
  });

  const templates: Template[] = [
    { id: 't1', title: '템플릿 1', body: '안녕하세요, 지원자님…' },
    { id: 't2', title: '템플릿 2', body: '감사합니다.' },
  ];

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
        evalStatus: `${item.interviewEvaluatedCount}/${item.interviewAssignedCount}`,
        interviewScore: Number(item.interviewAverageScore),
        status:
          item.status === 'PENDING'
            ? '보류'
            : item.status === 'INTERVIEW_PASS'
              ? '면접 합격'
              : item.status === 'INTERVIEW_FAIL'
                ? '면접 불합격'
                : '선택',
        smsSent: item.isSmsSent,
        mailSent: item.isMailSent,
        evaluators: item.interviewEvaluators.map((e) => ({
          name: e.name,
          profileColor: e.profileColor,
        })),
      };
    });
  }, [data, page, size, posColorMap]);

  const recipients = useMemo(
    () => rows.filter((r) => selectedIds.includes(r.id)).map((r) => r.name),
    [rows, selectedIds]
  );

  const setModalParam = (value: string | null) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (value) params.set('sideTab', value);
    else params.delete('sideTab');
    router.push(`${pathname}?${params.toString()}`);
  };

  const openAssignManagerModal = () => {
    router.push(
      `/apply-management/${activeTab}/assign-manager?recruitmentId=${recruitmentId}`
    );
  };
  return (
    <Flex direction="column" width="100%" height="100%" gap="1.2rem">
      <ActionToolbar
        hasSelection={selectedIds.length > 0}
        onSms={() => setModalParam('sms')}
        onMail={() => setModalParam('mail')}
        onDistribute={openAssignManagerModal}
        onAdd={() => {}}
      />

      <TableContainer
        headerMeta={INT_HEADER}
        data={rows}
        availableEvals={[]}
        selectedIds={selectedIds}
        sortState={{ [sortKey]: direction.toLowerCase() as any }}
        onSortChange={(key: string, dir: 'asc' | 'desc') => {
          setSortKey(key as any);
          setDirection(dir.toUpperCase() as any);
        }}
        currentPage={page + 1}
        totalItems={data?.pagination.totalElements ?? 0}
        pageSize={size}
        onPageChange={(p) => setPage(p - 1)}
        onToggleAll={(c) => setSelectedIds(c ? rows.map((m) => m.id) : [])}
        onToggleOne={(id, checked) =>
          setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((x) => x !== id)
          )
        }
      />

      {sideTab === 'sms' && (
        <SmsSideTab
          recipients={recipients}
          templates={templates}
          onClose={() => setModalParam(null)}
          onSend={(data) => {
            console.log('문자 전송:', data);
            setModalParam(null);
          }}
        />
      )}

      {sideTab === 'mail' && (
        <MailSideTab
          recipients={recipients}
          templates={templates}
          onClose={() => setModalParam(null)}
          onSend={(data) => {
            console.log('메일 전송:', data);
            setModalParam(null);
          }}
        />
      )}
    </Flex>
  );
}
