'use client';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import {
  SettingContext,
  SettingContextType,
} from '@web/app/(main)/application-list/setting/_context/SettingContext';
import { FormValues, InterviewSchedule } from '@web/types/application';
import { useContext, useMemo } from 'react';
import * as styles from './PreviewComponent.css';
import { PreviewHeader } from '@web/app/(main)/application-list/setting/(preview)/_components/PreivewHeader/PreivewHeader';
import { BasicInfoPreview } from '@web/app/(main)/application-list/setting/(preview)/_components/BasicInfoPreview/BasicInfoPreview';
import { AdditionalInfoPreview } from '@web/app/(main)/application-list/setting/(preview)/_components/AdditionalInfoPreview/AdditionalInfoPreview';
import { ApplicationPartsPreview } from '@web/app/(main)/application-list/setting/(preview)/_components/ApplicationPartPreview/ApplicationPartsPreview';
import { QuestionAndFileList } from '@web/app/(main)/application-list/setting/(preview)/_components/QuestionFileList/QuestionFileList';
import { SelectableTimeTable } from '@web/components/TimeTable/SelectableTimeTable';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { TIME_STEP } from '@web/utils/application';

export default function PreviewComponent() {
  const ctx = useContext<SettingContextType | null>(SettingContext);
  if (!ctx) return null;
  const form: FormValues = ctx.form;
  console.log('프리뷰', form);

  const applicationSchedule = [
    {
      label: '지원 마감',
      date: form.deadline ? format(parseISO(form.deadline), 'yyyy/MM/dd') : '',
    },
    {
      label: '서류 합격 발표',
      date: form.documentResult?.date
        ? format(parseISO(form.documentResult.date), 'yyyy/MM/dd')
        : '',
    },
    {
      label: '면접 일정',
      date: form.interviewSchedule?.scheduleList.length
        ? form.interviewSchedule.scheduleList
            .map((s) => format(parseISO(s.date), 'yyyy/MM/dd'))
            .join(', ')
        : '',
    },
    {
      label: '최종 합격 발표',
      date: form.finalResultDate
        ? format(parseISO(form.finalResultDate), 'yyyy/MM/dd')
        : '',
    },
  ];

  const timetableDates = Array.from(
    new Set(
      form.interviewSchedule?.scheduleList.map((s) => s.date) ?? [
        '2025-04-29',
        '2025-04-30',
      ]
    )
  );

  const interval = TIME_STEP[form.interviewDuration];

  // 2) admin이 설정한 scheduleList 전체
  const allSlots = form.interviewSchedule?.scheduleList ?? [];

  console.log('시간', allSlots);
  // 3) 날짜별로 묶어서 unique dates 추출
  const dates = useMemo(
    () => Array.from(new Set(allSlots.map((s) => s.date))),
    [allSlots]
  );

  // 4) 전체 슬롯에서 최소 시작시간 / 최대 종료시간(시(hour)만) 계산
  const hours = allSlots.flatMap((s) => [
    parseInt(s.startTime.split(':')[0]!, 10),
    parseInt(s.endTime.split(':')[0]!, 10),
  ]);
  const startHour = Math.min(...hours);
  const endHour = Math.max(...hours);

  return (
    <Flex
      direction="column"
      paddingLeft="1.9rem"
      paddingTop="2.4rem"
      paddingRight="1.9rem"
      paddingBottom="2.4rem"
      width="100%"
    >
      {/* 헤더 */}
      <PreviewHeader />

      {/* 미리보기 폼 */}
      <div className={styles.container}>
        {/* 공고 제목 및 지원 일정 */}
        <Flex direction="column" width="100%" gap="5rem">
          <div className={styles.title}>
            {form.title || '[한국대학생IT경영학회] 큐시즘 32기 학회원 모집'}
          </div>
          <div className={styles.headerWrapper}>
            {applicationSchedule.map((s, i) => (
              <div key={i} className={styles.item}>
                <Text variant="md1_text_semibold" color="grayscale70">
                  {s.label}
                </Text>
                <Text variant="md2_text_medium" color="grayscale50">
                  {s.date}
                </Text>
              </div>
            ))}
          </div>
        </Flex>

        {/* 기본 정보 */}
        <Flex direction="column" width="100%" gap="4rem">
          <BasicInfoPreview
            gender={form.basicInfo.gender}
            birthDate={form.basicInfo.birthDate}
          />

          {/* 아래 기본 추가 정보 */}
          <AdditionalInfoPreview
            school={form.basicInfo.school}
            academicStatus={form.basicInfo.academicStatus}
            major={form.basicInfo.major}
            address={form.basicInfo.address}
          />
        </Flex>

        {/* 지원 파트 */}
        {form.applicationParts?.isSelected && (
          <ApplicationPartsPreview parts={form.applicationParts?.parts} />
        )}

        {/* 질문 리스트 및 첨부 파일 */}
        <QuestionAndFileList detailItems={form.detailItems} />

        {/* 면접 시간대 */}
        <div style={{ width: '100%' }}>
          <Flex gap="0.4rem" direction="column">
            <Text variant="md1_text_semibold" color="grayscale70">
              면접 가능 일정 투표
            </Text>
            <Text variant="sm_caption_medium" color="grayscale40">
              아래 일정 중 면접이 가능한 모든 시간대를 드래그로 등록해주세요.
              (면접 시간: {form.interviewDuration} 소요)
            </Text>
          </Flex>

          <Flex
            gap="6.4rem"
            justify="center"
            width="100%"
            style={{ marginTop: '1.6rem' }}
          >
            {dates.map((isoDate) => {
              const dt = parseISO(isoDate);
              const label = format(dt, 'yyyy년 MM월 dd일 (EEE)', {
                locale: ko,
              });

              // 5) 해당 날짜 슬롯만 필터링
              const scheduleListForDate = allSlots.filter(
                (s) => s.date === isoDate
              );

              return (
                <SelectableTimeTable
                  key={isoDate}
                  title={label}
                  startHour={startHour}
                  endHour={endHour}
                  interval={interval}
                  width="40rem"
                  selectable={false}
                  interviewSchedule={{
                    isSelected: form.interviewSchedule?.isSelected ?? false,
                    scheduleList: scheduleListForDate,
                  }}
                />
              );
            })}
          </Flex>
        </div>
      </div>
    </Flex>
  );
}
