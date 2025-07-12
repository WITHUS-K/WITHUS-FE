'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import ItemCard from '../../_components/ItemCard/ItemCard';
import { Pagination } from '@repo/ui/Pagination';
import { useRecruitmentPositionsQuery } from '@web/store/query/useRecruitmentPositionsQuery';
import {
  useApplicationsClientQuery,
  useApplicationsQuery,
} from '@web/store/query/useApplicationsQuery';
import { mapServerColorToTagHex } from '@web/utils/color';
import * as styles from './page.css';

const PER_PAGE = 9;

export default function TabPageClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const { tab } = useParams() as { tab?: 'all' | 'BEFORE' | 'COMPLETED' };
  const activeTab = tab ?? 'all';

  const recruitmentId = Number(sp.get('recruitmentId'));
  const keyword = sp.get('keyword') ?? '';
  const page = sp.get('page') ? Number(sp.get('page')) : 1;

  // 포지션(태그) 컬러 매칭용 조회
  const { data: positions = [] } = useRecruitmentPositionsQuery(recruitmentId);

  // 탭 → API evaluationStatus 매핑
  const evaluationStatus = (() => {
    switch (activeTab) {
      case 'all':
        return 'ALL';
      case 'BEFORE':
        return 'NOT_EVALUATED';
      case 'COMPLETED':
        return 'EVALUATED';
      default:
        return 'ALL';
    }
  })() as 'ALL' | 'EVALUATED' | 'NOT_EVALUATED';

  // 지원서 목록 조회
  const { data: appsResult, isLoading } = useApplicationsClientQuery({
    recruitmentId,
    evaluationStatus,
    keyword,
    page: page - 1,
    size: PER_PAGE,
  });

  const apps = appsResult?.data ?? [];
  const pagination = appsResult?.pagination;

  // 페이징 버튼 클릭 시
  const onPageChange = (newPage: number) => {
    const params = new URLSearchParams(sp.toString());
    params.set('page', String(newPage));
    router.replace(`?${params.toString()}`);
  };

  if (isLoading || !pagination) {
    return null;
  }

  return (
    <>
      <Flex
        wrap="wrap"
        gap="2rem"
        justify="flexStart"
        style={{ minHeight: '36rem' }}
      >
        {apps.map((app) => {
          // 서버에서 가져온 포지션 이름으로 컬러 찾기
          const pos = positions.find((p) => p.name === app.positionName);
          const color = mapServerColorToTagHex(pos!.color);
          return (
            <ItemCard
              key={app.id}
              item={{
                id: app.id,
                name: app.name,
                positionName: app.positionName,
                tagColor: color,
                // 과거 mock의 BEFORE/COMPLETED 구분
                evaluationStatus:
                  app.documentEvaluated === false ? 'BEFORE' : 'COMPLETED',
                pass:
                  app.status === 'DOX_PASS' || app.status === 'INTERVIEW_PASS',
                evaluationScore: app.myScoreTotal ?? 0,
                interviewDate: app.interviewSchedule?.split('T')[0] ?? '',
                interviewTime:
                  app.interviewSchedule?.split('T')[1]?.slice(0, 5) ?? '',
              }}
            />
          );
        })}
      </Flex>

      <div className={styles.paginationStyle}>
        <Pagination
          totalItems={pagination!.totalElements}
          itemCountPerPage={PER_PAGE}
          currentPage={page}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
