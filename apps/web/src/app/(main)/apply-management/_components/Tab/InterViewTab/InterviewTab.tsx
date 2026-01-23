'use client';

import React, { useEffect, useMemo, useState, ChangeEvent, KeyboardEvent } from 'react';
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
  AdminApplicationStatus,
} from '@web/store/query/useAdminApplicationsQuery';
import { mapServerColorToTagHex } from '@web/utils/color';
import { HeaderMeta } from '../../ApplyListHeader/ApplyListHeader';
import { TagColor } from '@repo/utils';
import { useUpdateQuery } from '@web/store/query/useUpdateQuery';
import { useRecruitmentPositionsQuery } from '@web/store/query/useRecruitmentPositionsQuery';
import { useAdminApplicationsExcelDownload } from '@web/store/query/useAdminApplicationsExcelDownload';
import { toFixed1 } from '@web/utils/number';

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
  { key: 'status', label: '합불 여부', width: '11rem', sortable: true },
  { key: 'smsSent', label: '문자 발송', width: '10.2rem', sortable: true },
  { key: 'mailSent', label: '메일 발송', sortable: true },
];

const INTERVIEW_STATUS_OPTIONS = ['면접 합격', '면접 불합격', '보류'] as const;

function interviewStatusLabelToEnum(
  selected: string | null
): AdminApplicationStatus[] | undefined {
  if (!selected) return undefined;

  switch (selected) {
    case '면접 합격':
      return ['INTERVIEW_PASS'];
    case '면접 불합격':
      return ['INTERVIEW_FAIL'];
    case '보류':
      return ['INTERVIEW_PENDING'];
    default:
      return undefined;
  }
}

type InterviewSortKey = keyof (typeof sortByMap)['interviews'];

interface InterviewTabProps {
  recruitmentId: number;
}

export default function InterviewTab({ recruitmentId }: InterviewTabProps) {
  const params = useParams() as { tab: string };
  const searchParams = useSearchParams();
  const updateQuery = useUpdateQuery();

  const router = useRouter();
  const pathname = usePathname();


  const activeTab = params.tab;

  const side = searchParams.get('sideTab');
  const sideTab = side === 'sms' ? 'sms' : side === 'mail' ? 'mail' : null;
  
  const { data: positions = [] } = useRecruitmentPositionsQuery(recruitmentId);

  const posIdMap = useMemo(() => {
    const map: Record<string, number> = {};
    positions.forEach((p) => {
      map[p.name] = p.id;
    });
    return map;
  }, [positions]);

  const posColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    positions.forEach((p) => {
      map[p.name] = p.color; // 서버 color name
    });
    return map;
  }, [positions]);

  const positionOptions = useMemo(
    () => positions.map((p) => p.name),
    [positions]
  );

  // ===== URL 파라미터 파싱 =====
  const pageParam = Number(searchParams.get('page'));
  const page = !isNaN(pageParam) && pageParam > 0 ? pageParam - 1 : 0;

  const latestSort = searchParams.get('latest') === '1';

  const roleIdParam = searchParams.get('roleId');
  const selectedRoleId = roleIdParam ? Number(roleIdParam) : null;

  const statusParam = searchParams.get('status'); // INTERVIEW_PASS...
  const statuses = statusParam
    ? ([statusParam] as AdminApplicationStatus[])
    : undefined;

  const keywordParam = searchParams.get('keyword') ?? '';

  const urlSortKey = (searchParams.get('sortKey') as InterviewSortKey) ?? 'name';
  const urlDirection =
    (searchParams.get('direction')?.toUpperCase() as 'ASC' | 'DESC') ?? 'ASC';

  const apiSortBy: AdminApplicationSortBy = latestSort
    ? 'LATEST'
    : (sortByMap['interviews']![urlSortKey] as AdminApplicationSortBy);

  const apiDirection: 'ASC' | 'DESC' = latestSort ? 'DESC' : urlDirection;

  // 라벨 표시용 (id -> name)
  const selectedPositionLabel = useMemo(() => {
    if (!selectedRoleId) return null;
    const entry = Object.entries(posIdMap).find(([, id]) => id === selectedRoleId);
    return entry ? entry[0] : null;
  }, [selectedRoleId, posIdMap]);

  const selectedStatusLabel = useMemo(() => {
    if (!statusParam) return null;
    switch (statusParam) {
      case 'INTERVIEW_PASS':
        return '면접 합격';
      case 'INTERVIEW_FAIL':
        return '면접 불합격';
      case 'INTERVIEW_PENDING':
        return '보류';
      default:
        return null;
    }
  }, [statusParam]);

  // ===== 검색 입력 =====
  const [searchInput, setSearchInput] = useState(keywordParam);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const applySearch = () => {
    updateQuery({
      keyword: searchInput.trim() || null,
      page: '1',
    });
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') applySearch();
  };

  // ===== 필터 이벤트 =====
  const onPositionChange = (name: string) => {
    const id = posIdMap[name]; // ✅ 이제 undefined 아님(positions 기반)
    updateQuery({
      roleId: id != null ? String(id) : null,
      page: '1',
    });
  };

  const onStatusChange = (label: string) => {
    const enums = interviewStatusLabelToEnum(label);
    updateQuery({ status: enums?.[0] ?? null, page: '1' });
  };

  const onLatestSortChange = (v: boolean) => {
    updateQuery({ latest: v ? '1' : null, page: '1' });
  };

  // API는 배열을 기대하니 roleId -> organizationRoleIds로 변환
  const organizationRoleIds = selectedRoleId ? [selectedRoleId] : undefined;

  const size = 20;

  // ===== 데이터 요청 =====
  const { data, isLoading, isFetching } = useAdminApplicationsClientQuery({
    recruitmentId,
    stage: stageMap[activeTab],
    sortBy: apiSortBy,
    direction: apiDirection,
    page : page+1,
    size,
    organizationRoleIds,
    statuses,
    keyword: keywordParam,
  });

  const rows = useMemo(() => {
    if (!data) return [];
    return data.data.map((item, idx) => {
      const positionLabel = item.organizationRoleName ?? '공통';
      const positionColor: TagColor = item.organizationRoleName
        ? mapServerColorToTagHex(posColorMap[item.organizationRoleName]!)
        : '#5A5C72';

      return {
        applicationId: item.id,
        id: String(page * size + idx + 1).padStart(3, '0'),
        name: item.name,
        fieldTags: [{ label: positionLabel, color: positionColor }],
        evalStatus: `${item.interviewEvaluatedCount}/${item.interviewAssignedCount}`,
        interviewScore: toFixed1(item.interviewAverageScore),
        status: (() => {
          switch (item.status) {
            case 'INTERVIEW_PASS':
              return '면접 합격';
            case 'INTERVIEW_FAIL':
              return '면접 불합격';
            case 'INTERVIEW_PENDING':
              return '보류';
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
      };
    });
  }, [data, page, size, posColorMap]);

  const onPageChange = (newOneBased: number) => {
    updateQuery({
      page: String(newOneBased),
      sortKey: urlSortKey,
      direction: urlDirection.toLowerCase(),
    });
  };

  const handleSortChange = (key: string, dir: 'asc' | 'desc') => {
    updateQuery({
      sortKey: key,
      direction: dir,
      page: '1',
    });
  };

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const { mutate: downloadExcel, isPending: excelDownloading } =
  useAdminApplicationsExcelDownload();

const handleExcelDownload = () => {
  downloadExcel({
    recruitmentId,
    stage: stageMap[activeTab],           // DOCUMENT/INTERVIEW/FINAL_PASS/FAIL
    sortBy: apiSortBy,                    // 최신순 토글 포함한 서버 정렬 값
    direction: apiDirection,
    organizationRoleIds,                 // roleId 있으면 [id]
    statuses,                            // status 필터 있으면 ['DOX_PASS'...] 등
    keyword: keywordParam?.trim() || undefined,
  });
};

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
  }


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
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
        onSearchKeyDown={handleSearchKeyDown}
        latestSort={latestSort}
        onLatestSortChange={onLatestSortChange}
        onExcelDownload={handleExcelDownload}
      />

      <TableContainer
        headerMeta={INT_HEADER}
        data={rows}
        availableEvals={[]}
        selectedIds={selectedIds}
        onToggleAll={(c) => setSelectedIds(c ? rows.map((r) => r.id) : [])}
        onToggleOne={(id, checked) =>
          setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((x) => x !== id)
          )
        }
        sortState={{ [urlSortKey]: urlDirection.toLowerCase() as any }}
        onSortChange={handleSortChange}
        currentPage={page + 1}
        totalItems={data?.pagination.totalElements ?? 0}
        pageSize={size}
        onPageChange={onPageChange}
        isLoading={isLoading}
        isFetching={isFetching}
        // ✅ 지원분야 필터 props
        positionOptions={positionOptions}
        selectedPosition={selectedPositionLabel}
        onPositionChange={onPositionChange}
        // 상태 필터 props
        statusOptions={[...INTERVIEW_STATUS_OPTIONS]}
        selectedStatus={selectedStatusLabel}
        onStatusChange={onStatusChange}
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