'use client';

import React, { useEffect, useMemo, useState, ChangeEvent, KeyboardEvent } from 'react';
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
import { TagColor } from '@repo/utils';

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
  { key: 'status', label: '합불 여부', width: '11rem', sortable: true },
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

  // 최신순
  const [latestSort, setLatestSort] = useState(false);

  // ─── 페이지 번호 관리 ─────────────────────────────────────────────────────────
  const pageParam = Number(searchParams.get('page'));
  const initialPage = !isNaN(pageParam) && pageParam > 0 ? pageParam - 1 : 0;
  const [page, setPage] = useState(initialPage);
  useEffect(() => {
    if (page !== initialPage) setPage(initialPage);
  }, [initialPage]);

  const size = 20;

  // ─── 정렬 키 · 방향 관리 (URL 동기화) ────────────────────────────────────────────
  const urlSortKey =
    (searchParams.get('sortKey') as keyof (typeof sortByMap)['documents']) ??
    'name';
  const urlDirection =
    (searchParams.get('direction')?.toUpperCase() as 'ASC' | 'DESC') ?? 'ASC';
  const [sortKey, setSortKey] =
    useState<keyof (typeof sortByMap)['documents']>(urlSortKey);
  const [direction, setDirection] = useState<'ASC' | 'DESC'>(urlDirection);
  useEffect(() => {
    setSortKey(urlSortKey);
    setDirection(urlDirection);
  }, [urlSortKey, urlDirection]);

  const apiSortBy = sortByMap['documents']![sortKey] as AdminApplicationSortBy;

  const { data, isLoading, isFetching } = useAdminApplicationsClientQuery({
    recruitmentId,
    stage: stageMap[activeTab],
    sortBy: apiSortBy,
    direction,
    page,
    size,
  });

  // ─── 테이블용 row 생성 ───────────────────────────────────────────────────────────
  const rows = useMemo(() => {
    if (!data) return [];
    return data.data.map((item, idx) => {
      console.log("아이템", item)
      const positionLabel = item.organizationRoleName ?? '공통';

      const positionColor: TagColor = item.organizationRoleName
        ? mapServerColorToTagHex(posColorMap[item.organizationRoleName]!)
        : '#5A5C72'; 
      return {
        applicationId: item.id,
        id: String(page * size + idx + 1).padStart(3, '0'),
        name: item.name,
        fieldTags: [
          {
            label: positionLabel,
            color: positionColor,
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
      };
    });
  }, [data, page, size, posColorMap]);

  // ─── 모달 & 선택 로직 ───────────────────────────────────────────────────────────
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
    router.replace(`${pathname}?${qp.toString()}`);
  };

  const openAssignManagerModal = () =>
    router.push(
      `/apply-management/${activeTab}/assign-manager?recruitmentId=${
        recruitmentId
      }`
    );

  const handleCloseSideTab = () => {
    setModalParam(null);
    setSelectedIds([]);
  };

     const positionOptions = useMemo(() => {
    const base = Object.keys(posColorMap); 
    if (data?.data.some((item) => !item.organizationRoleName)) {
      return ['공통', ...base];
    }
    return base;
  }, [posColorMap, data]);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  // TODO: 나중에 서버 연동 시 selectedPosition을 쿼리 파라미터/요청 바디에 반영

const documentStatusOptions = ['서류 합격', '서류 불합격', '보류'];
const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  // TODO: selectedStatus 서버 연동
  
  /*검색*/
    const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
    // TODO: 나중에 서버 연동 시
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // 지금은 아무 동작 안 하도록 비워둠
    }
  };

  // ─── 페이지 변경 시 URL 반영 ────────────────────────────────────────────────────
  const onPageChange = (newOneBased: number) => {
    setPage(newOneBased - 1);
    const qp = new URLSearchParams(Array.from(searchParams.entries()));
    qp.set('page', String(newOneBased));
    qp.set('sortKey', sortKey);
    qp.set('direction', direction.toLowerCase());
    router.replace(`${pathname}?${qp.toString()}`);
  };

  // ─── 정렬 변경 시 URL 반영 ────────────────────────────────────────────────────
  const handleSortChange = (key: string, dir: 'asc' | 'desc') => {
    const qp = new URLSearchParams(Array.from(searchParams.entries()));
    qp.set('sortKey', key);
    qp.set('direction', dir);
    qp.set('page', '1');
    router.replace(`${pathname}?${qp.toString()}`);
  };

  return (
    <Flex direction="column" width="100%" gap="1.2rem">
      <ActionToolbar
        hasSelection={selectedIds.length > 0}
        onSms={() => setModalParam('sms')}
        onMail={() => setModalParam('mail')}
        onDistribute={openAssignManagerModal}
        onAdd={() =>
          router.push(`/apply-management/add?recruitmentId=${recruitmentId}`)
        }
           searchValue={searchKeyword}
        onSearchChange={handleSearchChange}
        onSearchKeyDown={handleSearchKeyDown}
         latestSort={latestSort}
  onLatestSortChange={(next) => {
    setLatestSort(next);
    // TODO: 나중에 서버에 정렬 방식 넘기기
  }}
      />

      <TableContainer
        headerMeta={DOC_HEADER}
        data={rows}
        availableEvals={[]}
        selectedIds={selectedIds}
        onToggleAll={(c) => setSelectedIds(c ? rows.map((r) => r.id) : [])}
        onToggleOne={(id, checked) =>
          setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((x) => x !== id)
          )
        }
        sortState={{ [sortKey]: direction.toLowerCase() as any }}
        onSortChange={handleSortChange}
        currentPage={page + 1}
        totalItems={data?.pagination.totalElements ?? 0}
        pageSize={size}
        onPageChange={onPageChange}
        isLoading={isLoading}
        isFetching={isFetching}
          positionOptions={positionOptions}
        selectedPosition={selectedPosition}
        onPositionChange={setSelectedPosition}
          statusOptions={documentStatusOptions}
  selectedStatus={selectedStatus}
  onStatusChange={setSelectedStatus}
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
