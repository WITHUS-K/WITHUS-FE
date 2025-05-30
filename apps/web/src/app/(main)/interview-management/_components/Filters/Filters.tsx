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

export default function Filters() {
  const qc = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confirm } = useModal();
  const pathname = usePathname();
  const tokens = getClientSideTokens();

  // URL 파라미터 파싱
  const urlRid = Number(searchParams.get('recruitmentId') ?? NaN) || undefined;
  const urlIv = Number(searchParams.get('interviewId') ?? NaN) || undefined;

  const [rid, setRid] = useState<number | undefined>(urlRid);
  const [iv, setIv] = useState<number | undefined>(urlIv);
  const [isEditing, setIsEditing] = useState<boolean>(urlIv == null);

  // 데이터 로드
  const { data: recruitments = [] } = useRecruitmentsQuery();
  const { data: orgInterviews = [] } = useOrganizationInterviewsQuery();
  const { data: positions = [] } = useRecruitmentPositionsQuery(urlRid ?? 0);
  const { data: config } = useInterviewConfigQuery(iv ?? 0);

  const [selectedTitle, setSelectedTitle] = useState<string>(() => {
    return recruitments.find((r) => r.recruitmentId === urlRid)?.title ?? '';
  });

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
  const { data: recruitmentDetail } = useRecruitmentDetailQuery(
    effectiveRid ?? 0
  );

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
  const handleRegenerate = () => {
    setIv(undefined);
    setIsEditing(true);

    // 1) 필터 폼 상태들(config 값)으로 리셋
    setRooms(config?.roomNames ?? ['']);
    setCounts({
      면접관: config?.interviewerCount ?? 0,
      지원자: config?.applicantCount ?? 0,
      안내자: config?.assistantCount ?? 0,
    });

    // 2) onSettingsChange 를 바로 트리거하도록 settings 리셋
    setSettings({
      rooms: config?.roomNames ?? [''],
      interviewerPerSlot: config?.interviewerCount ?? 0,
      applicantPerSlot: config?.applicantCount ?? 0,
      assistantPerSlot: config?.assistantCount ?? 0,
    });

    qc.invalidateQueries({
      queryKey: queryKeys.interview.schedule(existingInterview!),
    });
    qc.invalidateQueries({
      queryKey: queryKeys.interview.orgList(),
    });

    // 3) interviewId 없는 URL 로 돌아가면 timetable 컴포넌트가 placeholder 를 보여줍니다
    router.replace(`/interview-management?recruitmentId=${effectiveRid}`);
  };

  // 핸들러: 생성
  const createInterview = useCreateInterviewMutation();
  const createSchedule = useCreateScheduleMutation();

  const handleGenerate = async () => {
    if (!effectiveRid) return;

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
      description: '면접 테이블을 확정하시겠습니까?',
      cancelText: '취소',
      confirmText: '저장',
      onConfirm: handleRegenerate,
    });

  // 버튼 레이블/액션 분기
  const isGenerated = iv != null;
  const btnLabel =
    isGenerated && !isEditing ? '타임테이블 재생성' : '타임테이블 생성';
  const btnAction =
    isGenerated && !isEditing ? handleRegenerateConfirm : handleGenerate;

  // 저장 핸들러
  const handleSave = () =>
    confirm({
      type: 'info',
      description: `면접 타임테이블을 저장하시겠습니까?\n 저장 후에도 언제든 수정 가능합니다.`,
      cancelText: '취소',
      confirmText: '저장',
      onConfirm: () => {
        /* TODO */
      },
    });

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
                      tokens
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
          <Flex gap="2rem">
            <Button
              variant="sub"
              size="40"
              leftIcon={<IcRefresh width={24} height={24} />}
              onClick={btnAction}
              style={{ padding: '0.8rem 2rem' }}
            >
              {btnLabel}
            </Button>
            <Button
              variant="main"
              size="40"
              leftIcon={<IcSave width={24} height={24} />}
              disabled={!isGenerated || isEditing}
              onClick={handleSave}
              style={{ padding: '0.8rem 2rem' }}
            >
              저장
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
          disabled={!isEditing}
          initialSettings={
            iv != null
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
