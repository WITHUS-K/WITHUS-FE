// app/(main)/interview-management/_components/Filters/Filters.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Flex, Text, Button } from '@repo/ui';
import { ClubDropdown } from '@repo/ui/DropDown';
import { useRecruitmentsQuery } from '@web/store/query/useRecruitmentsQuery';
import { useOrganizationInterviewsQuery } from '@web/store/query/useOrganizationInterviewsQuery';
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';
import { useCreateInterviewMutation } from '@web/store/mutation/useCreateInterviewMutation';
import { useCreateScheduleMutation } from '@web/store/mutation/useCreateScheduleMutation';
import FilterForm, { FilterSettings } from './FilterForm/FilterForm';
import { IcRefresh, IcSave } from '@repo/ui/icons/colored';
import { useModal } from '@repo/ui/hooks';
import { useRecruitmentPositionsQuery } from '@web/store/query/useRecruitmentPositionsQuery';
import { TagHex, mapServerColorToTagHex } from '@web/utils/color';
import { useInterviewConfigQuery } from '@web/store/query/useInterviewConfigQuery';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@web/store/constants';
import { queryClient } from '@web/store/query/QueryClientProvider';
import { GET } from '@web/api';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useAutoAssignInterviewersMutation } from '@web/store/mutation/useAutoAssignInterviewersMutation';
import { useResetInterviewScheduleMutation } from '@web/store/mutation/useResetInterviewScheduleMutation';
import { IcRe } from '@repo/ui/icons/mono';

export default function Filters() {
  const qc = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confirm } = useModal();
  const pathname = usePathname();
  const tokens = getClientSideTokens();
  const { accessToken, refreshToken } = tokens;
  const { organizationId } = getClientSideTokens();

  // URL 파라미터 파싱
  const urlRid = Number(searchParams.get('recruitmentId') ?? NaN) || undefined;
  const urlIv = Number(searchParams.get('interviewId') ?? NaN) || undefined;

  const [rid, setRid] = useState<number | undefined>(urlRid);
  const [iv, setIv] = useState<number | undefined>(urlIv);
  const [isEditing, setIsEditing] = useState<boolean>(urlIv == null);

  // 데이터 로드
  const { data: recruitments = [] } = useRecruitmentsQuery();
  const { data: orgInterviews = [] } =
    useOrganizationInterviewsQuery(organizationId);
  const { data: positions = [] } = useRecruitmentPositionsQuery(urlRid ?? 0);
  const { data: config } = useInterviewConfigQuery(iv ?? 0);
  const resetSchedule = useResetInterviewScheduleMutation(iv!);

  const [selectedTitle, setSelectedTitle] = useState<string>(() => {
    return recruitments.find((r) => r.recruitmentId === urlRid)?.title ?? '';
  });

  const isConfigEmpty = !!(
    config &&
    config.roomNames.length === 0 &&
    config.interviewerCount === 0 &&
    config.applicantCount === 0 &&
    config.assistantCount === 0
  );

  // 면접실, 인원수 state
  const [rooms, setRooms] = useState<string[]>([]);
  const [counts, setCounts] = useState({ 면접관: 0, 지원자: 0, 안내자: 0 });
  const [settings, setSettings] = useState<FilterSettings>({
    rooms: [],
    interviewerPerSlot: 0,
    applicantPerSlot: 0,
    assistantPerSlot: 0,
  });

  //파트 가져오깅!
  const parts = positions.map((p) => p.name);
  const partColorMap = positions.reduce<Record<string, TagHex>>((acc, p) => {
    acc[p.name] = mapServerColorToTagHex(p.color);
    return acc;
  }, {});

  // URL param 변경 감지
  useEffect(() => {
    setRid(urlRid);
    setIv(urlIv);
    setIsEditing(urlIv == null);
    if (urlRid != null) {
      const found = recruitments.find((r) => r.recruitmentId === urlRid);
      setSelectedTitle(found?.title ?? '');
    }
  }, [urlRid, urlIv, recruitments]);

  // config 데이터가 변경되면 rooms/counts 상태 초기화
  useEffect(() => {
    if (!config || iv == null) return;
    const { roomNames, interviewerCount, applicantCount, assistantCount } =
      config;

    setRooms(roomNames);
    setCounts({
      면접관: interviewerCount,
      지원자: applicantCount,
      안내자: assistantCount,
    });
    setSettings({
      rooms: roomNames,
      interviewerPerSlot: interviewerCount,
      applicantPerSlot: applicantCount,
      assistantPerSlot: assistantCount,
    });
    setIsEditing(false);
  }, [config, iv]);

  // 첫 진입: rid 없으면 목록 첫 번째 선택
  useEffect(() => {
    if (pathname.includes('/invite')) return;
    if (recruitments.length > 0 && rid == null) {
      const first = recruitments[0]!;
      setRid(first.recruitmentId);
      setSelectedTitle(first.title);
      setIsEditing(true);
      router.replace(
        `/interview-management?recruitmentId=${first.recruitmentId}`
      );
    }
  }, [recruitments, rid, router]);

  // effective rid, existing interview 확인
  const effectiveRid = rid ?? recruitments[0]?.recruitmentId;
  const existingInterview = orgInterviews.find(
    (x) => x.recruitmentId === rid
  )?.interviewId;

  // ssr 도입하기
  const recruitmentId = effectiveRid ?? 0;
  const { data: recruitmentDetail } = useRecruitmentDetailQuery({
    recruitmentId,
  });

  const didAutoRedirect = useRef(false);
  useEffect(() => {
    if (
      didAutoRedirect.current || // 이미 한 번 처리했다면 건너뛴다
      pathname.includes('/invite') || // 모달 경로면 건너뛴다
      effectiveRid == null || // rid 없으면 건너뛴다
      existingInterview == null || // interviewId 없으면 건너뛴다
      iv != null || // iv(state)에 값이 있으면 (편집 모드 아님) 건너뛴다
      !recruitmentDetail?.availableTimeRanges?.length
    ) {
      return;
    }

    // 여기까지 왔으면 “초기 렌더링 + interview 생성됨 + iv URL 파라미터 없음” 상태
    const firstDate = recruitmentDetail.availableTimeRanges[0]!.date.replace(
      /-/g,
      '.'
    );
    router.replace(
      `/interview-management/timetable/all/${firstDate}` +
        `?recruitmentId=${effectiveRid}&interviewId=${existingInterview}`
    );

    didAutoRedirect.current = true; // 한 번만 실행되도록 표시
  }, [
    effectiveRid,
    existingInterview,
    iv,
    recruitmentDetail,
    router,
    pathname,
  ]);

  // 9) 이미 면접이 생성되어 있고 URL에 iv 없으면 자동으로 timetable로 이동
  useEffect(() => {
    // 모달 경로라면 아무 것도 하지 않는다
    if (pathname.includes('/invite')) return;

    if (
      !isEditing &&
      effectiveRid != null &&
      existingInterview != null &&
      iv == null &&
      recruitmentDetail?.availableTimeRanges?.length
    ) {
      const firstDate = recruitmentDetail.availableTimeRanges[0]!.date.replace(
        /-/g,
        '.'
      );
      router.replace(
        `/interview-management/timetable/all/${firstDate}` +
          `?recruitmentId=${effectiveRid}&interviewId=${existingInterview}`
      );
    }
  }, [
    effectiveRid,
    existingInterview,
    iv,
    recruitmentDetail,
    router,
    pathname,
    isEditing,
  ]);

  // 핸들러: 재생성 -> 편집 모드
  // 핸들러: 재생성 -> 편집 모드 + 필터 리셋
  const handleRegenerate = async () => {
    // 1) 서버에 reset 요청
    await resetSchedule.mutateAsync();

    // 2) 로컬 필터 상태를 config 기준으로 리셋
    setIv(undefined);
    setIsEditing(true);
    setRooms(config?.roomNames ?? ['']);
    setCounts({
      면접관: config?.interviewerCount ?? 0,
      지원자: config?.applicantCount ?? 0,
      안내자: config?.assistantCount ?? 0,
    });
    setSettings({
      rooms: config?.roomNames ?? [''],
      interviewerPerSlot: config?.interviewerCount ?? 0,
      applicantPerSlot: config?.applicantCount ?? 0,
      assistantPerSlot: config?.assistantCount ?? 0,
    });

    // 3) 관련 쿼리 무효화
    qc.invalidateQueries({
      queryKey: queryKeys.interview.schedule(existingInterview!),
    });
    qc.invalidateQueries({ queryKey: queryKeys.interview.orgList() });

    // 4) URL을 인터뷰 생성 전 상태로 이동
    router.replace(`/interview-management?recruitmentId=${effectiveRid}`);
  };

  // 핸들러: 생성
  const createInterview = useCreateInterviewMutation();
  const createSchedule = useCreateScheduleMutation();

  //console.log('면접ID', iv);
  const autoAssign = useAutoAssignInterviewersMutation(iv!);

  const handleGenerate = async () => {
    if (!effectiveRid) return;

    //지금은 존재하는 인터뷰 면 기존의 인터뷰아이디 써서 스케쥴 생성하고 있음...!!
    // 바꿔야 될게... 타임테이블 재생성하면 이제 인터뷰를 삭제 할 거 니까... existingInterview ?? 이로직 없어도 될듯..!!
    const newIv =
      existingInterview ??
      (await createInterview.mutateAsync({ recruitmentId: effectiveRid }));

    setIv(newIv);
    setIsEditing(false);

    await createSchedule.mutateAsync({
      recruitmentId: effectiveRid,
      interviewId: newIv,
      body: {
        interviewerPerSlot: settings.interviewerPerSlot,
        applicantPerSlot: settings.applicantPerSlot,
        assistantPerSlot: settings.assistantPerSlot,
        roomCount: settings.rooms.length,
        roomNames: settings.rooms, // ← 방 이름 배열 추가
      },
    });

    // 3) config를 fetchQuery로 직접 가져오기 (객체 한 개 인자)

    const firstDate =
      recruitmentDetail?.availableTimeRanges?.[0]!.date.replace(/-/g, '.') ??
      '';
    router.push(
      `/interview-management/timetable/all/${firstDate}` +
        `?recruitmentId=${effectiveRid}&interviewId=${newIv}`
    );
  };

  const handleRegenerateConfirm = () =>
    confirm({
      type: 'info',
      title: '타임테이블 초기화',
      description: '타임테이블을 초기화 하시겠습니까?',
      cancelText: '취소',
      confirmText: '초기화하기',
      onConfirm: handleRegenerate,
    });

  // 버튼 레이블/액션 분기
  const isGenerated = iv != null;
  const btnLabel =
    isGenerated && !isEditing ? '타임테이블 초기화' : '타임테이블 세팅';
  const btnAction =
    isGenerated && !isEditing ? handleRegenerateConfirm : handleGenerate;

  return (
    <Flex direction="column" width="100%" gap="2.5rem">
      <Flex direction="column" gap="0.5rem" width="100%">
        <Text variant="md2_text_medium" color="grayscale50">
          면접관리
        </Text>
        <Flex justify="spaceBetween" align="center" width="100%">
          <ClubDropdown
            clubs={recruitments.map((r) => r.title)}
            value={selectedTitle}
            onSelect={async (title) => {
              const found = recruitments.find((r) => r.title === title);
              if (!found) return;

              setSelectedTitle(title);
              setRid(found.recruitmentId);
              setIv(undefined);
              setIsEditing(true);

              const interview = orgInterviews.find(
                (x) => x.recruitmentId === found.recruitmentId
              );

              try {
                const detail = await queryClient.fetchQuery({
                  queryKey: queryKeys.recruitment.detail(found.recruitmentId),
                  queryFn: () =>
                    GET<{ availableTimeRanges: { date: string }[] }>(
                      `api/v1/recruitments/${found.recruitmentId}`,
                      { accessToken, refreshToken }
                    ),
                });

                const ranges = detail?.result.availableTimeRanges;
                if (interview?.interviewId && ranges?.length > 0) {
                  const firstDate = ranges[0]!.date.replace(/-/g, '.');
                  router.replace(
                    `/interview-management/timetable/all/${firstDate}` +
                      `?recruitmentId=${found.recruitmentId}&interviewId=${interview.interviewId}`
                  );
                } else {
                  router.replace(
                    `/interview-management?recruitmentId=${found.recruitmentId}`
                  );
                }
              } catch (error) {
                console.error('모집공고 상세 조회 실패:', error);
                router.replace(
                  `/interview-management?recruitmentId=${found.recruitmentId}`
                );
              }
            }}
          />
          <Flex gap="2rem" align="center">
            <Button
              variant="sub"
              size="40"
              leftIcon={<IcRe width={24} height={24} />}
              onClick={handleRegenerateConfirm}
              disabled={isConfigEmpty || !iv}
              style={{ padding: '0.8rem 2rem' }}
            >
              초기화
            </Button>

            <Button
              variant="sub"
              size="40"
              onClick={handleGenerate}
              disabled={!isConfigEmpty && !!iv}
              style={{ padding: '0.8rem 2rem' }}
            >
              타임테이블 세팅
            </Button>

            <Button
              variant="main"
              size="40"
              disabled={isConfigEmpty || !iv}
              style={{ padding: '0.8rem 2rem' }}
              onClick={() => autoAssign.mutate()}
            >
              면접관 배정
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {effectiveRid && (
        <FilterForm
          key={iv ?? 'new'}
          parts={parts}
          partColorMap={partColorMap}
          onSettingsChange={setSettings}
          disabled={!isEditing && !isConfigEmpty}
          initialSettings={
            config && !isConfigEmpty
              ? {
                  rooms,
                  interviewerPerSlot: counts.면접관,
                  applicantPerSlot: counts.지원자,
                  assistantPerSlot: counts.안내자,
                }
              : undefined
          }
        />
      )}
    </Flex>
  );
}
