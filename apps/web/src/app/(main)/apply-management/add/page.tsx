'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import type { TimeRange } from '@web/components/TimeTable/SelectableTimeTable';
import { ApplicantForm } from '@web/types/applicant-form';
import { dummyForm } from '@web/constants/application';
import { AddHeader } from '@web/app/(main)/apply-management/add/_components/AddHeader/AddHeader';
import { BasicInfoForm } from '@web/app/(main)/apply-management/add/_components/BasicInfoForm/BasicInfoForm';
import { AdditionalInfoForm } from '@web/app/(main)/apply-management/add/_components/AdditionalInfoForm/AdditionalInfoForm';
import { ApplicationPartsForm } from '@web/app/(main)/apply-management/add/_components/ApplicationPartsForm/ApplicationPartsForm';
import { QuestionAndFileListForm } from '@web/app/(main)/apply-management/add/_components/QuestionFileListForm/QuestionFileListForm';
import { InterviewScheduleForm } from '@web/app/(main)/apply-management/add/_components/InterviewScheduleForm/InterviewScheduleForm';
import * as styles from './page.css';

export default function AddApplicant() {
  const { watch, setValue } = useForm<ApplicantForm>({
    defaultValues: {
      basicInfo: {
        name: '',
        gender: undefined,
        phone: '',
        birthDate: undefined,
        email: '',
        profileImage: null,
      },
      additionalInfo: {
        school: '',
        academicStatus: '',
        major: '',
        address: '',
      },
      applicationPart: dummyForm.applicationParts?.parts[0],
      interviewSchedule: {
        scheduleList: dummyForm.interviewSchedule?.scheduleList,
      },
    },
  });

  const basicInfo = watch('basicInfo');
  const additionalInfo = watch('additionalInfo');
  const applicationPart = watch('applicationPart');
  const interviewSchedule = watch('interviewSchedule');

  const textItems = dummyForm.detailItems.filter((d) => d.type === 'text');
  //const fileItems = dummyForm.detailItems.filter((d) => d.type === 'file');

  const [answers, setAnswers] = useState<string[]>(textItems.map(() => ''));
  const fileItems = dummyForm.detailItems.filter((d) => d.type === 'file');
  const [files, setFiles] = useState<(File | null)[]>(
    Array(fileItems.length).fill(null)
  );

  const handleAnswerChange = (idx: number, v: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = v;
      return next;
    });
  };

  const handleFileChange = (idx: number, file: File | null) => {
    setFiles((prev) => {
      const next = [...prev];
      next[idx] = file;
      return next;
    });
  };

  const dates = Array.from(
    new Set(dummyForm.interviewSchedule!.scheduleList.map((s) => s.date))
  );
  const scheduleMap: Record<string, TimeRange[]> = {};
  interviewSchedule.scheduleList.forEach((itm) => {
    scheduleMap[itm.date] ||= [];
    scheduleMap[itm.date]?.push({
      startTime: itm.startTime,
      endTime: itm.endTime,
    });
  });

  const applicationSchedule = [
    { label: '지원 마감', date: dummyForm.deadline },
    { label: '서류 합격 발표', date: dummyForm.documentResult?.date || '' },
    {
      label: '면접 일정',
      date: dummyForm.interviewSchedule?.scheduleList
        .map((s) => s.date)
        .join(', '),
    },
    { label: '최종 합격 발표', date: dummyForm.finalResultDate },
  ];

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <AddHeader />

        {/* 공고 제목 및 일정 */}
        <Flex direction="column" width="100%" gap="5rem">
          <div className={styles.title}>{dummyForm.title}</div>
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

        {/* 기본/추가 정보 */}
        <Flex direction="column" width="100%" gap="4rem">
          <BasicInfoForm
            value={basicInfo}
            file={basicInfo.profileImage}
            onChange={(f, v) =>
              setValue(`basicInfo.${f}`, v, { shouldDirty: true })
            }
            onImageChange={(f) =>
              setValue('basicInfo.profileImage', f, { shouldDirty: true })
            }
          />
          <AdditionalInfoForm
            value={additionalInfo}
            onChange={(f, v) =>
              setValue(`additionalInfo.${f}`, v, { shouldDirty: true })
            }
          />
        </Flex>

        {/* 지원 파트 */}
        <ApplicationPartsForm
          parts={dummyForm.applicationParts!.parts}
          selectedPart={applicationPart}
          onChange={(p) =>
            setValue('applicationPart', p, { shouldDirty: true })
          }
        />

        {/* 질문 & 파일 업로드 */}
        <QuestionAndFileListForm
          detailItems={dummyForm.detailItems}
          answers={answers}
          files={files}
          onAnswerChange={handleAnswerChange}
          onFileChange={handleFileChange}
        />

        {/* 면접 일정 선택 */}
        <InterviewScheduleForm
          dates={dates}
          scheduleMap={scheduleMap}
          onScheduleChange={(date, ranges) => {
            setValue(
              'interviewSchedule.scheduleList',
              ranges.map((r) => ({
                date,
                startTime: r.startTime,
                endTime: r.endTime,
              })),
              { shouldDirty: true }
            );
          }}
        />

        {/* 저장 버튼 */}
        <div className={styles.saveButton}>
          <Button variant="basic" size="40" width="10rem">
            저장
          </Button>
        </div>
      </div>
    </div>
  );
}
