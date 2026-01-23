'use client';

import React, { ChangeEvent, useEffect, useMemo, useState, KeyboardEvent } from 'react';
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
import { TagColor } from '@repo/utils';
import { useRecruitmentPositionsQuery } from '@web/store/query/useRecruitmentPositionsQuery';
import { useUpdateQuery } from '@web/store/query/useUpdateQuery';
import { useAdminApplicationsExcelDownload } from '@web/store/query/useAdminApplicationsExcelDownload';
import { toFixed1 } from '@web/utils/number';

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
  { key: 'status', label: '합불 여부', width: '16rem' },
  { key: 'smsSent', label: '문자 발송', width: '15rem' },
  { key: 'mailSent', label: '메일 발송' },
];

type FinalSortKey = keyof (typeof sortByMap)['final'];

interface FinalTabProps {
  recruitmentId: number;
}

export default function FinalTab({ recruitmentId }: FinalTabProps) {
  const router = useRouter();
  const params = useParams() as { tab: string };
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updateQuery = useUpdateQuery();

  const activeTab = params.tab;

  // ----------------------------
  // SideTab (sms/mail) URL 연동
  // ----------------------------
  const side = searchParams.get('sideTab');
  const sideTab = side === 'sms' ? 'sms' : side === 'mail' ? 'mail' : null;

  const setModalParam = (value: string | null) => {
    const qp = new URLSearchParams(searchParams.toString());
    if (value) qp.set('sideTab', value);
    else qp.delete('sideTab');
    router.replace(`${pathname}?${qp.toString()}`, { scroll: false });
  };

  const handleCloseSideTab = () => {
    setModalParam(null);
    setSelectedIds([]);
  };

  // ----------------------------
  // ✅ positions API로 지원분야 옵션 + map 생성
  // ----------------------------
  const { data: positions = [] } = useRecruitmentPositionsQuery(recruitmentId);

  const positionOptions = useMemo(() => positions.map((p) => p.name), [positions]);

  const posIdMap = useMemo(() => {
    const map: Record<string, number> = {};
    positions.forEach((p) => (map[p.name] = p.id));
    return map;
  }, [positions]);

  const posColorMap = useMemo(() => {
    const map: Record<string, string> = {};
    positions.forEach((p) => (map[p.name] = p.color));
    return map;
  }, [positions]);

  // ----------------------------
  // ✅ URL → 필터/검색/페이지/정렬 파싱
  // ----------------------------
  const pageParam = Number(searchParams.get('page'));
  const page = !isNaN(pageParam) && pageParam > 0 ? pageParam - 1 : 0;
  const size = 20;

  const keywordParam = (searchParams.get('keyword') ?? '').trim();

  // 지원분야: roleId 하나로 URL 관리 → API엔 organizationRoleIds 배열로 전달
  const roleIdParam = searchParams.get('roleId');
  const selectedRoleId = roleIdParam ? Number(roleIdParam) : null;
  const organizationRoleIds = selectedRoleId ? [selectedRoleId] : undefined;

  const latestSort = searchParams.get('latest') === '1';

  const urlSortKey = (searchParams.get('sortKey') as FinalSortKey) ?? 'name';
  const urlDirection =
    (searchParams.get('direction')?.toUpperCase() as 'ASC' | 'DESC') ?? 'ASC';

  const apiSortBy: AdminApplicationSortBy = latestSort
    ? 'LATEST'
    : (sortByMap['final']![urlSortKey] as AdminApplicationSortBy);

  const apiDirection: 'ASC' | 'DESC' = latestSort ? 'DESC' : urlDirection;

  // ----------------------------
  // ✅ 라벨 표시용 (id -> name)
  // ----------------------------
  const selectedPositionLabel = useMemo(() => {
    if (!selectedRoleId) return null;
    const found = Object.entries(posIdMap).find(([, id]) => id === selectedRoleId);
    return found ? found[0] : null;
  }, [selectedRoleId, posIdMap]);

  // ----------------------------
  // ✅ 검색 입력 (URL 동기화)
  // ----------------------------
  const [searchKeyword, setSearchKeyword] = useState(keywordParam);

  useEffect(() => {
    setSearchKeyword(keywordParam);
  }, [keywordParam]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const applySearch = () => {
    updateQuery({
      keyword: searchKeyword.trim() || null,
      page: '1',
    });
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') applySearch();
  };

  // ----------------------------
  // ✅ 지원 분야 필터 핸들러 (URL 반영 → API 재호출)
  // ----------------------------
  const onPositionChange = (name: string) => {
    const id = posIdMap[name];
    updateQuery({
      roleId: id != null ? String(id) : null,
      page: '1',
    });
  };

  const onLatestSortChange = (next: boolean) => {
    updateQuery({
      latest: next ? '1' : null,
      page: '1',
    });
  };

  // ----------------------------
  // ✅ 정렬/페이지 변경 (URL 반영)
  // ----------------------------
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
      latest: null,
    });
  };

  // ----------------------------
  // ✅ 데이터 패칭
  // (최종 합격 탭이므로 stageMap[activeTab]이 서버에서 "최종합격"만 내려주는 stage여야 합니다)
  // ----------------------------
  const { data, isLoading, isFetching } = useAdminApplicationsClientQuery({
    recruitmentId,
    stage: stageMap[activeTab],
    sortBy: apiSortBy,
    direction: apiDirection,
    page : page+1,
    size,
    organizationRoleIds,
    keyword: keywordParam || undefined,
    // ❌ statuses는 쓰지 않음 (최종합격 탭 자체가 서버에서 필터링)
  });

  // ----------------------------
  // ✅ rows 생성
  // ----------------------------
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
        documentScore: toFixed1(item.documentAverageScore),
        interviewScore: toFixed1(item.interviewAverageScore),
        status: '최종합격',
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

  // ----------------------------
  // ✅ 선택/발송 대상
  // ----------------------------
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selectedRows = rows.filter((r) => selectedIds.includes(r.id));
  const applicationIds = selectedRows.map((r) => r.applicationId);
  const recipientNames = selectedRows.map((r) => r.name);

  const { mutate: downloadExcel, isPending: excelDownloading } =
  useAdminApplicationsExcelDownload();

const handleExcelDownload = () => {
  downloadExcel({
    recruitmentId,
    stage: stageMap[activeTab],      // FINAL_PASS여야 함
    sortBy: apiSortBy,
    direction: apiDirection,
    organizationRoleIds,
    keyword: keywordParam || undefined,
    // Final 탭은 statuses 없음
  });
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
        searchValue={searchKeyword}
        onSearchChange={handleSearchChange}
        onSearchKeyDown={handleSearchKeyDown}
        latestSort={latestSort}
        onLatestSortChange={onLatestSortChange}
        onExcelDownload={handleExcelDownload}
      />

      <TableContainer
        headerMeta={HEADER}
        data={rows as MemberWithEval[]}
        selectedIds={selectedIds}
        sortState={{ [urlSortKey]: urlDirection.toLowerCase() as any }}
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
        // ✅ 지원분야 필터만
        positionOptions={positionOptions}
        selectedPosition={selectedPositionLabel}
        onPositionChange={onPositionChange}
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