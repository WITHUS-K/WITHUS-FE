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
  AdminApplicationStatus,
} from '@web/store/query/useAdminApplicationsQuery';
import { sortByMap, stageMap } from '../../../[tab]/TabClient';
import { mapServerColorToTagHex } from '@web/utils/color';
import { TagColor } from '@repo/utils';
import { useRecruitmentPositionsQuery } from '@web/store/query/useRecruitmentPositionsQuery';
import { useAdminApplicationsExcelDownload } from '@web/store/query/useAdminApplicationsExcelDownload';

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

const DOCUMENT_STATUS_OPTIONS = ['서류 합격', '서류 불합격', '보류'] as const;

function statusLabelToEnum(selected: string | null): AdminApplicationStatus[] | undefined {
  if (!selected) return undefined;
  switch (selected) {
    case '서류 합격':
      return ['DOX_PASS'];
    case '서류 불합격':
      return ['DOX_FAIL'];
    case '보류':
      return ['DOX_PENDING'];
    default:
      return undefined;
  }
}

export default function DocumentTab({ recruitmentId, posColorMap}: DocumentTabProps) {
  const router = useRouter();
  const params = useParams() as { tab: string };
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = params.tab;

  // ✅ URL patch helper
  const updateQuery = (patch: Record<string, string | null>) => {
    const qp = new URLSearchParams(Array.from(searchParams.entries()));
    Object.entries(patch).forEach(([k, v]) => {
      if (!v) qp.delete(k);
      else qp.set(k, v);
    });
    router.replace(`${pathname}?${qp.toString()}`);
  };

  const { data: positions = [] } = useRecruitmentPositionsQuery(recruitmentId);
  // ── URL -> 상태 (단일 소스)
  const pageParam = Number(searchParams.get('page'));
  const page = !isNaN(pageParam) && pageParam > 0 ? pageParam - 1 : 0; // 0-based

  const latestSort = searchParams.get('latest') === '1';

  const roleIdParam = searchParams.get('roleId');
  const selectedRoleId = roleIdParam ? Number(roleIdParam) : null;

  const statusParam = searchParams.get('status'); // ex) DOX_PASS
  const statuses = statusParam ? ([statusParam] as AdminApplicationStatus[]) : undefined;

  const keywordParam = searchParams.get('keyword') ?? '';

  const posIdMap = useMemo(() => {
    const map: Record<string, number> = {};
    positions.forEach((p) => {
      map[p.name] = p.id;
    });
    return map;
  }, [positions]);

  // 정렬(기존 유지)
  const urlSortKey =
    (searchParams.get('sortKey') as keyof (typeof sortByMap)['documents']) ?? 'name';
  const urlDirection =
    (searchParams.get('direction')?.toUpperCase() as 'ASC' | 'DESC') ?? 'ASC';

  // ✅ 최신순이면 서버 정렬 강제
  const apiSortBy: AdminApplicationSortBy = latestSort
    ? 'LATEST'
    : (sortByMap['documents']![urlSortKey] as AdminApplicationSortBy);

  const apiDirection: 'ASC' | 'DESC' = latestSort ? 'DESC' : urlDirection;

  // ── UI 표시용(라벨) 상태는 URL 기반으로 계산
  const selectedPositionLabel = useMemo(() => {
    if (!selectedRoleId) return null;
    const entry = Object.entries(posIdMap).find(([, id]) => id === selectedRoleId);
    return entry ? entry[0] : null;
  }, [selectedRoleId, posIdMap]);

  const selectedStatusLabel = useMemo(() => {
    if (!statusParam) return null;
    switch (statusParam) {
      case 'DOX_PASS':
        return '서류 합격';
      case 'DOX_FAIL':
        return '서류 불합격';
      case 'DOX_PENDING':
        return '보류';
      default:
        return null;
    }
  }, [statusParam]);

  // ── 검색 입력(입력값만 state, 적용값은 URL)
  const [searchInput, setSearchInput] = useState(keywordParam);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const applySearch = () => {
    updateQuery({
      keyword: searchInput.trim() || null,
      page: '1', // ✅ 검색 시 1페이지로
    });
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') applySearch();
  };

  // ── 필터 옵션
  const positionOptions = useMemo(
    () => positions.map((p) => p.name),
    [positions]
  );
  const onPositionChange = (name: string) => {
    const id = posIdMap?.[name];
    updateQuery({ roleId: id != null ? String(id) : null, page: '1' });
  };
  const onStatusChange = (label: string) => {
    const enums = statusLabelToEnum(label);
    updateQuery({
      status: enums?.[0] ?? null,
      page: '1',
    });
  };

  const onLatestSortChange = (v: boolean) => {
    updateQuery({
      latest: v ? '1' : null,
      page: '1',
    });
  };

  // ── API 파라미터
  const organizationRoleIds = selectedRoleId ? [selectedRoleId] : undefined;

  const size = 20;

  const { data, isLoading, isFetching } = useAdminApplicationsClientQuery({
    recruitmentId,
    stage: stageMap[activeTab],
    sortBy: apiSortBy,
    direction: apiDirection,
    page,
    size,
    organizationRoleIds,
    statuses,
    keyword: keywordParam,
  });

  // ── rows 변환(기존 로직 유지)
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
        evalStatus: `${item.documentEvaluatedCount}/${item.documentAssignedCount}`,
        score: Number(item.documentAverageScore),
        status: (() => {
          switch (item.status) {
            case 'DOX_PASS':
              return '서류 합격';
            case 'DOX_FAIL':
              return '서류 불합격';
            case 'DOX_PENDING':
              return '보류';
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

  // ── 페이지네이션/정렬 → URL 저장
  const onPageChange = (newOneBased: number) => {
    updateQuery({
      page: String(newOneBased),
      sortKey: urlSortKey,
      direction: urlDirection.toLowerCase(),
    });
  };

  const handleSortChange = (key: string, dir: 'asc' | 'desc') => {
    // 최신순이 켜져 있으면 최신순이 우선이라 sort 변경해도 서버는 latest로 강제됨.
    updateQuery({
      sortKey: key,
      direction: dir,
      page: '1',
    });
  };

  // 선택 로직은 기존대로 (필터/검색과 무관)
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

  return (
    <Flex direction="column" width="100%" gap="1.2rem">
      <ActionToolbar
        hasSelection={selectedIds.length > 0}
        onSms={() => {}}
        onMail={() => {}}
        onDistribute={() => {}}
        onAdd={() => {}}
        searchValue={searchInput}
        onSearchChange={handleSearchChange}
        onSearchKeyDown={handleSearchKeyDown}
        latestSort={latestSort}
        onLatestSortChange={onLatestSortChange}
        onExcelDownload={handleExcelDownload}
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
        sortState={{ [urlSortKey]: urlDirection.toLowerCase() as any }}
        onSortChange={handleSortChange}
        currentPage={page + 1}
        totalItems={data?.pagination.totalElements ?? 0}
        pageSize={size}
        onPageChange={onPageChange}
        isLoading={isLoading}
        isFetching={isFetching}
        positionOptions={positionOptions}
        selectedPosition={selectedPositionLabel}
        onPositionChange={onPositionChange}
        statusOptions={[...DOCUMENT_STATUS_OPTIONS]}
        selectedStatus={selectedStatusLabel}
        onStatusChange={onStatusChange}
      />
    </Flex>
  );
}