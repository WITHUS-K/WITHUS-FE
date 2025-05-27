// app/(main)/interview-management/_components/Filters/Filters.tsx
'use client';

import { useEffect, useState } from 'react';
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

export default function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { confirm } = useModal();
  const pathname = usePathname();

  // URL 파라미터 파싱
  const urlRid = Number(searchParams.get('recruitmentId') ?? NaN) || undefined;
  const urlIv = Number(searchParams.get('interviewId') ?? NaN) || undefined;

  // 데이터 로드
  const { data: recruitments = [] } = useRecruitmentsQuery();
  const { data: orgInterviews = [] } = useOrganizationInterviewsQuery();
  const { data: positions = [] } = useRecruitmentPositionsQuery(urlRid ?? 0);
  const { data: config } = useInterviewConfigQuery(urlIv ?? 0);

  // Component state
  const [rid, setRid] = useState<number | undefined>(urlRid);
  const [iv, setIv] = useState<number | undefined>(urlIv);
  const [isEditing, setIsEditing] = useState<boolean>(urlIv == null);
  const [selectedTitle, setSelectedTitle] = useState<string>(() => {
    return recruitments.find((r) => r.recruitmentId === urlRid)?.title ?? '';
  });

  // 면접실, 인원수 state
  const [rooms, setRooms] = useState<string[]>(config?.roomNames ?? ['']);
  const [counts, setCounts] = useState<{
    면접관: number;
    지원자: number;
    안내자: number;
  }>({
    면접관: config?.interviewerCount ?? 1,
    지원자: config?.applicantCount ?? 1,
    안내자: config?.assistantCount ?? 1,
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
    if (config && iv != null) {
      setRooms(config.roomNames);
      setCounts({
        면접관: config.interviewerCount,
        지원자: config.applicantCount,
        안내자: config.assistantCount,
      });
      setIsEditing(false);
    }
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

  // 9) 이미 면접이 생성되어 있고 URL에 iv 없으면 자동으로 timetable로 이동
  useEffect(() => {
    // 모달 경로라면 아무 것도 하지 않는다
    if (pathname.includes('/invite')) return;

    if (
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
  ]);

  // 핸들러: 재생성 -> 편집 모드
  const handleRegenerate = () => {
    setIv(undefined);
    setIsEditing(true);
    router.replace(`/interview-management?recruitmentId=${effectiveRid}`);
  };

  // 핸들러: 생성
  const createInterview = useCreateInterviewMutation();
  const createSchedule = useCreateScheduleMutation();
  const [settings, setSettings] = useState<FilterSettings>({
    rooms: [''],
    interviewerPerSlot: 1,
    applicantPerSlot: 1,
    assistantPerSlot: 1,
  });

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
      },
    });

    const firstDate =
      recruitmentDetail?.availableTimeRanges?.[0]!.date.replace(/-/g, '.') ??
      '';
    router.push(
      `/interview-management/timetable/all/${firstDate}` +
        `?recruitmentId=${effectiveRid}&interviewId=${newIv}`
    );
  };

  // 버튼 레이블/액션 분기
  const isGenerated = iv != null;
  const btnLabel =
    isGenerated && !isEditing ? '타임테이블 재생성' : '타임테이블 생성';
  const btnAction =
    isGenerated && !isEditing ? handleRegenerate : handleGenerate;

  // 저장 핸들러
  const handleSave = () =>
    confirm({
      type: 'info',
      description:
        '면접 타임테이블을 저장하시겠습니까? 저장 후에도 언제든 수정 가능합니다.',
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
            onSelect={(title) => {
              setSelectedTitle(title);
              const found = recruitments.find((r) => r.title === title);
              if (found) {
                setIv(undefined);
                setRid(found.recruitmentId);
                setIsEditing(true);
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
          parts={parts}
          partColorMap={partColorMap}
          onSettingsChange={setSettings}
          disabled={!isEditing}
          initialSettings={{
            rooms,
            interviewerPerSlot: counts.면접관,
            applicantPerSlot: counts.지원자,
            assistantPerSlot: counts.안내자,
          }}
        />
      )}
    </Flex>
  );
}
