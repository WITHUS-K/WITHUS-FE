'use client';

import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams, useRouter } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { addMinutes, format as formatDate } from 'date-fns';
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';
import {
  useCreateApplication,
  CreateApplicationRequest,
} from '@web/store/mutation/useCreateApplication';
import { ApplicantForm } from '@web/types/applicant-form';
import { DetailItem, InterviewScheduleItem } from '@web/types/application';
import { FileQuestionDto, TextQuestionDto } from '@web/types/recruitment';

import { AddHeader } from './_components/AddHeader/AddHeader';
import { BasicInfoForm } from './_components/BasicInfoForm/BasicInfoForm';
import { AdditionalInfoForm } from './_components/AdditionalInfoForm/AdditionalInfoForm';
import {
  ApplicationPartsForm,
  PartOption,
} from './_components/ApplicationPartsForm/ApplicationPartsForm';

import { InterviewScheduleForm } from './_components/InterviewScheduleForm/InterviewScheduleForm';

import * as styles from './page.css';
import { useQueryClient } from '@tanstack/react-query';
import { safeFormatDotDate } from '@web/utils/application';
import {
  AnswerFile,
  QuestionAndFileListForm,
} from '@web/components/QuestionFileListForm/QuestionFileListForm';
import {
  buildRoleGroups,
  toSelectedPartLabels,
} from '@web/utils/applicationParts';

interface Props {
  recruitmentId: number;
}

export default function AddApplicantClient({ recruitmentId }: Props) {
  const router = useRouter();
  const sp = useSearchParams();

  const createApp = useCreateApplication();

  const { data } = useRecruitmentDetailQuery({
    recruitmentId,
  });

  const { watch, setValue, handleSubmit } = useForm<ApplicantForm>({
    defaultValues: {
      basicInfo: {
        name: '',
        gender: undefined,
        phone: '',
        birthDate: undefined,
        email: '',
      },
      additionalInfo: {
        school: '',
        academicStatus: undefined,
        major: '',
        address: '',
        profileImage: null,
      },
      applicationPart: undefined,
      applicationParts: [],
      questionAnswers: [],
      questionFiles: [],
      interviewSchedule: {
        scheduleList: [],
      },
    },
  });

  const currentScheduleList = watch('interviewSchedule.scheduleList') || [];
  const handleScheduleChange = useCallback(
    (date: string, itemsForDate: InterviewScheduleItem[]) => {
      // 기존에 선택된 항목 중, 해당 날짜가 아닌 것만 필터링
      const others = currentScheduleList.filter((item) => item.date !== date);

      // 새로 받은 itemsForDate + 기존 다른 날짜 항목 합치기
      const newList = [...others, ...itemsForDate];

      setValue('interviewSchedule.scheduleList', newList);
    },
    [currentScheduleList, setValue]
  );

  // data 없을 때는 빈 배열로 안전 처리
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

  const selectedParts = watch('applicationParts') ?? [];
  const selectedPartIds = selectedParts.map((part) => part.id);
  const selectedPartLabels = useMemo(
    () => toSelectedPartLabels(selectedParts),
    [selectedParts]
  );

  const partOptions = useMemo(
    () =>
      data?.positions.map((position) => ({
        id: position.id,
        label: position.roleName,
      })) ?? [],
    [data?.positions]
  );

  const roleGroups = useMemo(
    () =>
      buildRoleGroups(
        partOptions,
        data?.roleGroups?.map((group) => ({
          id: group.id,
          name: group.name,
          selectionMinCount: group.selectionMinCount,
          selectionMaxCount: group.selectionMaxCount,
          roles: group.roles.map((role) => ({
            id: role.id,
            label: role.roleName,
          })),
        }))
      ),
    [data?.roleGroups, partOptions]
  );

  useEffect(() => {
    if (
      data?.positions.length &&
      selectedParts.length === 0
    ) {
      const firstPart = data.positions[0];
      const defaultPart = {
        id: firstPart!.id,
        label: firstPart!.roleName,
      };
      setValue('applicationPart', defaultPart);
      setValue('applicationParts', [defaultPart]);
    }
  }, [data?.positions, selectedParts.length, setValue]);

  // detailItems 정의부를 이렇게 바꿔주세요.
  const detailItems: (DetailItem & { questionId: number })[] = useMemo(
    () =>
      data?.applicationQuestions
        // 파트 이름(positionName) 이 선택된 파트 라벨과 같은 것만
        .filter(
          (q) =>
            q.organizationRoleName === '공통' ||
            selectedPartLabels.has(q.organizationRoleName)
        )
        .map((q) => {
          if (q.type === 'TEXT') {
            const tq = q as TextQuestionDto;
            const infoText =
              tq.textLimit === 0 ? '제한 없음' : `${tq.textLimit}자`;
            return {
              questionId: tq.questionId,
              required: tq.required,
              type: 'text',
              description: tq.title,
              addDescription: tq.description,
              typeInfo: {
                info: infoText,
                infoDetail: tq.includeWhitespace ? '공백 포함' : '공백 제외',
              },
            };
          } else {
            const fq = q as FileQuestionDto;
            return {
              questionId: fq.questionId,
              required: fq.required,
              type: 'file',
              description: fq.title,
              addDescription: fq.description,
              typeInfo: {
                info: `${fq.maxFileCount}`,
                infoDetail: `${fq.maxFileSizeMb}`,
              },
            };
          }
        }) ?? [],
    [data?.applicationQuestions, selectedPartLabels]
  );

  const onSubmit = useCallback(
    (vals: ApplicantForm) => {
      if (!data) return;
  
      type AnswerPayloadItem = CreateApplicationRequest['answers'][number];
  
      let textIndex = 0;
      let fileIndex = 0;
  
      const uploadedFiles: File[] = [];
  
      const answers = detailItems.flatMap<AnswerPayloadItem>((item) => {
        if (item.type === 'text') {
          const answer = vals.questionAnswers[textIndex++] ?? '';
          return [
            {
              questionId: item.questionId,
              answerText: answer,
              fileName: null,
            },
          ];
        }

        const raw = vals.questionFiles[fileIndex++];
  
        // raw: File | File[] | null | undefined → 배열로 정규화
        const files = Array.isArray(raw) ? raw : raw ? [raw] : [];
  
        // 실제 File 인스턴스만 추림
        const realFiles = files.filter((f): f is File => f instanceof File);
  
        // 업로드 목록에도 동일하게 추가 (answers에 적힌 파일명과 1:1로 맞추기 위함)
        uploadedFiles.push(...realFiles);
  
        // 파일이 없으면 fileName은 null
        if (realFiles.length === 0) {
          return [
            {
              questionId: item.questionId,
              answerText: '',
              fileName: null,
            },
          ];
        }
  
        // 서버가 질문당 1개만 받는다면 여기서 realFiles[0]만 쓰면 됨
        return realFiles.map((f) => ({
          questionId: item.questionId,
          answerText: '',
          fileName: f.name,
        }));
      });
  
      // 면접 가능 시간 처리(기존 그대로)
      const rawTimes = vals.interviewSchedule.scheduleList.flatMap((slot) => {
        const date = slot.date!.replace(/\./g, '-');
        const start = new Date(`${date}T${slot.startTime}:00`);
        const end = new Date(`${date}T${slot.endTime}:00`);
        const interval = data.interviewDuration;
  
        const result: string[] = [];
        let current = start;
  
        while (current < end) {
          result.push(formatDate(current, "yyyy-MM-dd'T'HH:mm:ss"));
          current = addMinutes(current, interval);
        }
  
        return result;
      });
  
      const availableTimes = Array.from(new Set(rawTimes));
  
      const payload: CreateApplicationRequest = {
        name: vals.basicInfo.name,
        email: vals.basicInfo.email,
        phoneNumber: vals.basicInfo.phone.replace(/\D/g, ''),
        gender: (vals.basicInfo.gender || 'MALE').toUpperCase() as 'MALE' | 'FEMALE',
        recruitmentId,
        positionIds: vals.applicationParts?.map((part) => part.id) ?? [],
        answers, 
        availableTimes,
        university: vals.additionalInfo.school ?? '',
        major: vals.additionalInfo.major ?? '',
        academicStatus: vals.additionalInfo.academicStatus ?? undefined,
        birthDate: vals.basicInfo.birthDate ? vals.basicInfo.birthDate.slice(0, 10) : '',
        address: vals.additionalInfo.address ?? '',
      };
  
      const profileImage = vals.additionalInfo.profileImage ?? undefined;
  
      createApp.mutate(
        { payload, profileImage, answerFiles: uploadedFiles },
        {
          onSuccess: () => router.back(),
          onError: (err) => console.error(err),
        }
      );
    },
    [createApp, data, detailItems, recruitmentId, router]
  );
  

  // — 실제 폼 렌더링 —
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.layout}>
      <AddHeader />
      <div className={styles.container}>
        <Flex direction="column" width="100%" gap="5rem" align="center">
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
            file={watch('additionalInfo.profileImage')}
            onChange={(f, v) => setValue(`basicInfo.${f}`, v)}
            onImageChange={(f) => setValue('additionalInfo.profileImage', f)}
            needGender={data.needGender}
            needBirthDate={data.needBirthDate}
            needImage={data.needImage}
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
          parts={partOptions}
          roleGroups={roleGroups}
          selectedPartId={watch('applicationPart')?.id}
          selectedPartIds={selectedPartIds}
          onChange={(p: PartOption) => {
            setValue('applicationPart', p);
            setValue('applicationParts', [p]);
          }}
          onMultiChange={(parts: PartOption[]) => {
            setValue('applicationParts', parts);
            setValue('applicationPart', parts[0]);
          }}
        />

        <QuestionAndFileListForm
          readOnly={false}
          detailItems={detailItems}
          answers={watch('questionAnswers')}
          files={watch('questionFiles')}
          onAnswerChange={(i, v) => setValue(`questionAnswers.${i}`, v)}
          onFileChange={(i, f) => setValue(`questionFiles.${i}`, f)}
        />

        <InterviewScheduleForm
          isRequired={data.isInterviewRequired}
          dates={dates}
          scheduleMap={scheduleMap}
          duration={data.interviewDuration}
          onScheduleChange={handleScheduleChange}
          selectedScheduleList={currentScheduleList}
        />

        <div className={styles.saveButton}>
          <Button type="submit" variant="main" size="40" width="10rem">
            저장
          </Button>
        </div>
      </div>
    </form>
  );
}
