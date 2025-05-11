'use client';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import {
  SettingContext,
  SettingContextType,
} from '@web/app/(main)/application-list/setting/_context/SettingContext';
import { FormValues, InterviewSchedule } from '@web/types/application';
import { useContext } from 'react';
import * as styles from './page.css';
import { PreviewHeader } from '@web/app/(main)/application-list/setting/preview/_components/PreivewHeader/PreivewHeader';
import { BasicInfoPreview } from '@web/app/(main)/application-list/setting/preview/_components/BasicInfoPreview/BasicInfoPreview';
import { AdditionalInfoPreview } from '@web/app/(main)/application-list/setting/preview/_components/AdditionalInfoPreview/AdditionalInfoPreview';
import { ApplicationPartsPreview } from '@web/app/(main)/application-list/setting/preview/_components/ApplicationPartPreview/ApplicationPartsPreview';
import { QuestionAndFileList } from '@web/app/(main)/application-list/setting/preview/_components/QuestionFileList/QuestionFileList';
import { SelectableTimeTable } from '@web/components/TimeTable/SelectableTimeTable';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale/ko';

export default function ApplicationPreview() {
  const ctx = useContext<SettingContextType | null>(SettingContext);
  if (!ctx) return null;
  const form: FormValues = ctx.form;

  const applicationSchedule = [
    { label: '지원 마감', date: form.deadline || '2025/04/20' },
    {
      label: '서류 합격 발표',
      date: form.documentResult?.date || '2025/04/24',
    },
    {
      label: '면접 일정',
      date: form.interviewSchedule?.scheduleList.length
        ? form.interviewSchedule.scheduleList.map((s) => s.date).join(', ')
        : '2025/04/29, 2025/04/30',
    },
    { label: '최종 합격 발표', date: form.finalResultDate || '2025/05/03' },
  ];

  const timetableDates = Array.from(
    new Set(
      form.interviewSchedule?.scheduleList.map((s) => s.date) ?? [
        '2025-04-29',
        '2025-04-30',
      ]
    )
  );

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
              (면접 시간: 15분 소요)
            </Text>
          </Flex>

          <Flex
            gap="6.4rem"
            justify="center"
            width="100%"
            style={{ marginTop: '1.6rem' }}
          >
            {timetableDates.map((isoDate) => {
              const dt = parseISO(isoDate);
              const label = format(dt, 'yyyy년 MM월 dd일 (EEE)', {
                locale: ko,
              });

              const interviewSchedule: InterviewSchedule = {
                isSelected: true,
                scheduleList: [
                  { date: isoDate, startTime: '10:00', endTime: '14:00' },
                  { date: isoDate, startTime: '17:00', endTime: '18:00' },
                ],
              };

              return (
                <SelectableTimeTable
                  key={isoDate}
                  title={label}
                  startHour={10}
                  endHour={18}
                  interval={15}
                  width="40rem"
                  selectable={false}
                  interviewSchedule={interviewSchedule}
                />
              );
            })}
          </Flex>
        </div>
      </div>
    </Flex>
  );
}
