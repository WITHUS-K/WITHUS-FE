// src/web/app/(main)/apply-management/add/page.tsx
'use client';

import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { parse, format, isValid } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import { addMinutes, format as formatDate } from 'date-fns';
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';
import {
  useCreateApplication,
  CreateApplicationRequest,
} from '@web/store/mutation/useCreateApplication';
import { ApplicantForm } from '@web/types/applicant-form';
import { DetailItem } from '@web/types/application';
import { FileQuestionDto, TextQuestionDto } from '@web/types/recruitment';

import { AddHeader } from './_components/AddHeader/AddHeader';
import { BasicInfoForm } from './_components/BasicInfoForm/BasicInfoForm';
import { AdditionalInfoForm } from './_components/AdditionalInfoForm/AdditionalInfoForm';
import {
  ApplicationPartsForm,
  PartOption,
} from './_components/ApplicationPartsForm/ApplicationPartsForm';
import { QuestionAndFileListForm } from './_components/QuestionFileListForm/QuestionFileListForm';
import { InterviewScheduleForm } from './_components/InterviewScheduleForm/InterviewScheduleForm';

import * as styles from './page.css';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@web/store/constants';

export function safeFormatDotDate(
  dotDate?: string,
  pattern = 'yyyy.MM.dd'
): string {
  if (!dotDate) return '';
  const dt = parse(dotDate, 'yyyy.MM.dd', new Date(), { locale: ko });
  if (!isValid(dt)) return '';
  return format(dt, pattern, { locale: ko });
}

export default function AddApplicant() {
  const router = useRouter();
  const sp = useSearchParams();
  const recruitmentId = Number(sp.get('recruitmentId'));
  const queryClient = useQueryClient();

  // — Hooks 순서 고정 —
  const createApp = useCreateApplication();
  const { data, isLoading, error } = useRecruitmentDetailQuery(recruitmentId);
  const { watch, setValue, handleSubmit } = useForm<ApplicantForm>({
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
        academicStatus: undefined,
        major: '',
        address: '',
      },
      applicationPart: undefined,
      questionAnswers: [],
      questionFiles: [],
      interviewSchedule: {
        scheduleList: [],
      },
    },
  });

  // — data 없을 때는 빈 배열로 안전 처리 —
  const scheduleList =
    data?.availableTimeRanges.map((r) => ({
      date: r.date,
      startTime: r.startTime,
      endTime: r.endTime,
    })) ?? [];

  const dates = useMemo(
    () => Array.from(new Set(scheduleList.map((s) => s.date))),
    [scheduleList]
  );

  const scheduleMap = useMemo(() => {
    const m: Record<string, { startTime: string; endTime: string }[]> = {};
    scheduleList.forEach((r) => {
      m[r.date] ||= [];
      m[r.date]!.push({ startTime: r.startTime, endTime: r.endTime });
    });
    return m;
  }, [scheduleList]);

  const applicationSchedule = useMemo(
    () => [
      { label: '지원 마감', date: safeFormatDotDate(data?.documentDeadline) },
      {
        label: '서류 합격 발표',
        date: safeFormatDotDate(data?.documentResultDate),
      },
      {
        label: '면접 일정',
        date: dates
          .map((d) => safeFormatDotDate(d, 'yyyy.MM.dd'))
          .filter(Boolean)
          .join(', '),
      },
      {
        label: '최종 합격 발표',
        date: safeFormatDotDate(data?.finalResultDate),
      },
    ],
    [data, dates]
  );

  const detailItems: (DetailItem & { questionId: number })[] = useMemo(
    () =>
      data?.applicationQuestions.map((q) => {
        if (q.type === 'TEXT') {
          const tq = q as TextQuestionDto;
          return {
            questionId: tq.questionId,
            isEssential: tq.required,
            type: 'text',
            description: tq.description,
            addDescription: '',
            typeInfo: {
              info: `${tq.textLimit}자`,
              infoDetail: tq.includeWhitespace ? '공백 포함' : '공백 제외',
            },
          };
        } else {
          const fq = q as FileQuestionDto;
          return {
            questionId: fq.questionId,
            isEssential: fq.required,
            type: 'file',
            description: fq.description,
            addDescription: '',
            typeInfo: {
              info: `${fq.maxFileCount}개`,
              infoDetail: `${fq.maxFileSizeMb}MB`,
            },
          };
        }
      }) ?? [],
    [data]
  );

  const onSubmit = useCallback(
    (vals: ApplicantForm) => {
      if (!data) return;

      let textIndex = 0;
      let fileIndex = 0;

      const answers = detailItems.map((item) => {
        if (item.type === 'text') {
          const answer = vals.questionAnswers[textIndex++] ?? '';
          return {
            questionId: item.questionId,
            answerText: answer,
            fileName: null,
          };
        } else {
          const file = vals.questionFiles[fileIndex++];
          return {
            questionId: item.questionId,
            answerText: '',
            fileName: file instanceof File ? file.name : '',
          };
        }
      });

      const payload: CreateApplicationRequest = {
        name: vals.basicInfo.name,
        email: vals.basicInfo.email,
        phoneNumber: vals.basicInfo.phone,
        gender: (vals.basicInfo.gender || 'MALE').toUpperCase() as
          | 'MALE'
          | 'FEMALE',
        recruitmentId,
        positionId: vals.applicationPart!.id,
        answers,
        availableTimes: vals.interviewSchedule.scheduleList.flatMap((slot) => {
          const date = slot.date.replace(/\./g, '-');
          const start = new Date(`${date}T${slot.startTime}:00`);
          const end = new Date(`${date}T${slot.endTime}:00`);
          const interval = data.interviewDuration; // 예: 30 (분 단위)

          const result: string[] = [];
          let current = start;

          while (current < end) {
            result.push(formatDate(current, "yyyy-MM-dd'T'HH:mm:ss"));
            current = addMinutes(current, interval);
          }

          return result;
        }),
        // 선택 항목은 조건부로만 포함
        ...(vals.additionalInfo.school && {
          university: vals.additionalInfo.school,
        }),
        ...(vals.additionalInfo.major && { major: vals.additionalInfo.major }),
        ...(vals.additionalInfo.academicStatus && {
          academicStatus: vals.additionalInfo.academicStatus,
        }),
        ...(vals.basicInfo.birthDate && {
          birthDate: vals.basicInfo.birthDate.slice(0, 10),
        }),
        ...(vals.additionalInfo.address && {
          address: vals.additionalInfo.address,
        }),
      };

      const profileImage = vals.basicInfo.profileImage ?? undefined;
      const answerFiles = vals.questionFiles.filter(
        (f): f is File => f instanceof File
      );

      createApp.mutate(
        { payload, profileImage, answerFiles },
        {
          onSuccess: (res) => {
            console.log('지원서 생성 성공 res:', res);
            queryClient.invalidateQueries({
              queryKey: ['admin', 'applications', 'recruitment', recruitmentId],
            });
            // 이전 페이지로 이동
            router.back();
          },
          onError: (err) => {
            console.error('지원서 생성 에러:', err);
          },
        }
      );
    },
    [createApp, data, detailItems, recruitmentId, router]
  );

  // — 여기는 렌더링 전 상태 처리 —
  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100%">
        <Text>로딩 중...</Text>
      </Flex>
    );
  }
  if (error || !data) {
    return (
      <Flex justify="center" align="center" height="100%">
        <Text color="error">
          데이터를 불러오지 못했습니다: {error?.message}
        </Text>
      </Flex>
    );
  }

  // — 실제 폼 렌더링 —
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.layout}>
      <div className={styles.container}>
        <AddHeader />

        <Flex direction="column" width="100%" gap="5rem">
          <Text variant="xl_title_semibold">{data.title}</Text>
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

        <Flex direction="column" width="100%" gap="4rem">
          <BasicInfoForm
            value={watch('basicInfo')}
            file={watch('basicInfo.profileImage')}
            onChange={(f, v) => setValue(`basicInfo.${f}`, v)}
            onImageChange={(f) => setValue('basicInfo.profileImage', f)}
            needGender={data.needGender}
            needBirthDate={data.needBirthDate}
          />
          <AdditionalInfoForm
            value={watch('additionalInfo')}
            onChange={(f, v) => setValue(`additionalInfo.${f}`, v)}
            needSchool={data.needSchool}
            needAcademicStatus={data.needAcademicStatus}
            needMajor={data.needMajor}
            needAddress={data.needAddress}
          />
        </Flex>

        <ApplicationPartsForm
          parts={data.positions.map((p) => ({
            id: p.id,
            label: p.name,
          }))}
          selectedPartId={watch('applicationPart')?.id}
          onChange={(p: PartOption) => setValue('applicationPart', p)}
        />

        <QuestionAndFileListForm
          detailItems={detailItems}
          answers={watch('questionAnswers')}
          files={watch('questionFiles')}
          onAnswerChange={(i, v) => setValue(`questionAnswers.${i}`, v)}
          onFileChange={(i, f) => setValue(`questionFiles.${i}`, f)}
        />

        <InterviewScheduleForm
          dates={dates}
          scheduleMap={scheduleMap}
          duration={data.interviewDuration}
          onScheduleChange={(date, items) =>
            setValue('interviewSchedule.scheduleList', items)
          }
        />

        <div className={styles.saveButton}>
          {createApp.error && (
            <Text color="error">{createApp.error.message}</Text>
          )}
          <Button type="submit" variant="basic" size="40" width="10rem">
            저장
          </Button>
        </div>
      </div>
    </form>
  );
}
