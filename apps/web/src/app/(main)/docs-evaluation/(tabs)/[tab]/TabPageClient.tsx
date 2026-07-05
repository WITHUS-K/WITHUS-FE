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
import { IcDocsNon } from '@repo/ui/icons/colored';
import { Text } from '@repo/ui/Text';

const PER_PAGE = 9;

export default function TabPageClient({ recruitmentId }: { recruitmentId: number }) {
  const router = useRouter();
  const sp = useSearchParams();

  const { tab } = useParams() as { tab?: 'all' | 'BEFORE' | 'COMPLETED' };
  const activeTab = tab ?? 'all';

  //const recruitmentId = Number(sp.get('recruitmentId'));
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

  console.log('지원서 리스트', appsResult);

  const apps = appsResult?.data ?? [];
  const pagination = appsResult?.pagination;

  // 페이징 버튼 클릭 시
  const onPageChange = (newPage: number) => {
    const params = new URLSearchParams(sp.toString());
    params.set('page', String(newPage));
    router.replace(`?${params.toString()}`);
  };

  return (
    <>
      {apps.length === 0 ? (
        <Flex
          width="100%"
          height="100%"
          direction="column"
          align="center"
          justify="center"
          gap="2rem"
          marginTop="15rem"
        >
          <IcDocsNon width={120} height={120} />
          <Text variant="lg_subtitle_medium" color="grayscale30">
            아직 접수된 지원자가 없습니다.
          </Text>
        </Flex>
      ) : (
        <>
          <div className={styles.scrollContainer}>
            <Flex wrap="wrap" gap="2rem">
              {apps.map((app) => {
                const positionNames =
                  app.appliedPositions && app.appliedPositions.length > 0
                    ? app.appliedPositions
                    : [app.organizationRoleName ?? '공통'];
                const displayPositionName = positionNames.join(', ');
                const firstPositionName = positionNames[0];
                const pos = positions.find((p) => p.name === firstPositionName);
                const tagColor =
                  firstPositionName == null || firstPositionName === '공통'
                    ? '#7F82A1'
                    : mapServerColorToTagHex(pos?.color ?? 'GRAY');
                return (
                  <ItemCard
                    key={app.id}
                    item={{
                      id: app.id,
                      name: app.name,
                      organizationRoleName: displayPositionName,
                      tagColor: tagColor,

                      evaluationStatus:
                        app.documentEvaluated === false
                          ? 'BEFORE'
                          : 'COMPLETED',
                      pass:
                        app.status === 'DOX_PASS' ||
                        app.status === 'INTERVIEW_PASS' ||
                        app.status === 'PENDING' ||
                        app.status === 'DOX_PENDING' ||
                        app.status === 'INTERVIEW_PENDING',
                      evaluationScore:
                        app.myScoreTotal != null
                          ? Number(
                              
                                app.myScoreTotal
                                
                            
                            )
                          : 0,
                      interviewDate: app.interviewSchedule?.split('T')[0] ?? '',
                      interviewTime:
                        app.interviewSchedule?.split('T')[1]?.slice(0, 5) ?? '',
                        maxScore : app.documentMaxScore != null ? Number(app.documentMaxScore) : 0
                        
                    }}
                  />
                );
              })}
            </Flex>
          </div>

          <div className={styles.paginationStyle}>
            <Pagination
              totalItems={pagination!.totalElements}
              itemCountPerPage={PER_PAGE}
              currentPage={page}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </>
  );
}
