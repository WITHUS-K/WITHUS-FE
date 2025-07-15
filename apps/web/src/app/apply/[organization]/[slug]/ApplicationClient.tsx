'use client';

import {
  CreateApplicationRequest,
  useCreateApplication,
} from '@web/store/mutation/useCreateApplication';
import { useRecruitmentBySlugQuery } from '@web/store/query/useRecruitmentBySlugQuery';
import { ApplicantForm } from '@web/types/applicant-form';
import { DetailItem, InterviewScheduleItem } from '@web/types/application';
import { FileQuestionDto, TextQuestionDto } from '@web/types/recruitment';
import { safeFormatDotDate } from '@web/utils/application';
import { addMinutes, formatDate } from 'date-fns';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { Text } from '@repo/ui/Text';
import * as styles from './page.css';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { BasicInfoForm } from '@web/app/(main)/apply-management/add/_components/BasicInfoForm/BasicInfoForm';
import { AdditionalInfoForm } from '@web/app/(main)/apply-management/add/_components/AdditionalInfoForm/AdditionalInfoForm';
import {
  ApplicationPartsForm,
  PartOption,
} from '@web/app/(main)/apply-management/add/_components/ApplicationPartsForm/ApplicationPartsForm';
import {
  AnswerFile,
  QuestionAndFileListForm,
} from '@web/components/QuestionFileListForm/QuestionFileListForm';
import { InterviewScheduleForm } from '@web/app/(main)/apply-management/add/_components/InterviewScheduleForm/InterviewScheduleForm';
import { useModal } from '@repo/ui/hooks';
import { useRouter } from 'next/navigation';
import {
  FormNavigator,
  NavItem,
} from './_components/FormNavigator/FormNavigator';
import { FormFieldStatusProvider } from './_context/FormFieldStatusContext';
import { PartStatusResetter } from './_context/PartStatusResetter';

interface ApplicationClientProps {
  slug: string;
}

export default function ApplicationClient({ slug }: ApplicationClientProps) {
  const router = useRouter();
  const createApp = useCreateApplication();
  const { data } = useRecruitmentBySlugQuery({ slug });
  const { confirm } = useModal();
  console.log('슬러그', data);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    if (isMobile) {
      confirm({
        type: 'warning',
        title: `해당페이지는\nPC에서만 접근 가능합니다.`,
        confirmText: '확인',
      });
    }
  }, [confirm]);

  const { watch, setValue, handleSubmit, getValues } = useForm<ApplicantForm>({
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
      questionAnswers: [],
      questionFiles: [] as AnswerFile[][],
      interviewSchedule: {
        scheduleList: [],
      },
    },
  });

  const commonTextCount =
    data?.applicationQuestions.filter(
      (q) => q.type === 'TEXT' && q.positionName === '공통'
    ).length ?? 0;

  const commonFileCount =
    data?.applicationQuestions.filter(
      (q) => q.type === 'FILE' && q.positionName === '공통'
    ).length ?? 0;

  const currentScheduleList = watch('interviewSchedule.scheduleList') || [];
  const handleScheduleChange = useCallback(
    (date: string, itemsForDate: InterviewScheduleItem[]) => {
      const others = currentScheduleList.filter((item) => item.date !== date);
      const newList = [...others, ...itemsForDate];

      setValue('interviewSchedule.scheduleList', newList);
    },
    [currentScheduleList, setValue]
  );

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

  const selectedPartLabel = watch('applicationPart')?.label;

  const detailItems: (DetailItem & { questionId: number })[] = useMemo(
    () =>
      data?.applicationQuestions
        // 파트 이름(positionName) 이 선택된 파트 라벨과 같은 것만
        .filter(
          (q) =>
            q.positionName === '공통' || q.positionName === selectedPartLabel
        )
        .map((q) => {
          console.log(q);
          if (q.type === 'TEXT') {
            const tq = q as TextQuestionDto;
            const infoText =
              tq.textLimit === 0 ? '제한 없음' : `${tq.textLimit}자`;
            return {
              questionId: tq.questionId,
              isEssential: tq.required,
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
              isEssential: fq.required,
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
    [data?.applicationQuestions, selectedPartLabel]
  );

  const partTextCount = detailItems.filter((d) => d.type === 'text').length;
  const partFileCount = detailItems.filter((d) => d.type === 'file').length;

  // 파트가 바뀔 때 폼 값 리셋
  useEffect(() => {
    const curAnswers = getValues('questionAnswers') as string[];
    const newAnswers = [
      ...curAnswers.slice(0, commonTextCount),
      ...Array(partTextCount - commonTextCount).fill(''),
    ];
    setValue('questionAnswers', newAnswers);

    const curFiles = getValues('questionFiles') as File[][];
    const newFiles: File[][] = [
      ...curFiles.slice(0, commonFileCount),
      ...Array(partFileCount - commonFileCount).fill([]),
    ];

    setValue('questionFiles', newFiles);
  }, [
    selectedPartLabel,
    commonTextCount,
    commonFileCount,
    partTextCount,
    partFileCount,
    getValues,
    setValue,
  ]);

  const needImage = data.needImage;
  const needGender = data?.needGender;
  const needBirthDate = data?.needBirthDate;
  const needSchool = data?.needSchool;
  const needAcademicStatus = data?.needAcademicStatus;
  const needMajor = data?.needMajor;
  const needAddress = data?.needAddress;
  const needInterview = data.isInterviewRequired;

  const basicInfo = watch('basicInfo');
  const additionalInfo = watch('additionalInfo');

  const basicFilled =
    Boolean(basicInfo.name) &&
    Boolean(basicInfo.email) &&
    Boolean(basicInfo.phone);

  const additionalFilled =
    (!needImage || Boolean(additionalInfo.profileImage)) &&
    (!needSchool || Boolean(additionalInfo.school)) &&
    (!needAcademicStatus || additionalInfo.academicStatus != null) &&
    (!needMajor || Boolean(additionalInfo.major)) &&
    (!needAddress || Boolean(additionalInfo.address)) &&
    (!needGender || basicInfo.gender != null) &&
    (!needBirthDate || basicInfo.birthDate != null);

  const textItems = detailItems.filter((d) => d.type === 'text');
  const fileItems = detailItems.filter((d) => d.type === 'file');

  // 필수(required) 질문만 골라서
  const requiredTextItems = textItems.filter((d) => d.isEssential);
  const requiredFileItems = fileItems.filter((d) => d.isEssential);

  // 리액트훅폼에서 watch 해온 값
  const textAnswers = watch('questionAnswers'); // string[]
  const fileAnswers = watch('questionFiles'); // File[][]

  // 1) 텍스트 질문이 모두 채워졌는지
  const textAnswered = requiredTextItems.every((_, idx) =>
    Boolean(textAnswers[idx]?.trim())
  );

  // 2) 파일 질문이 모두 1개 이상 업로드되었는지
  const fileAnswered = requiredFileItems.every(
    (_, idx) => Array.isArray(fileAnswers[idx]) && fileAnswers[idx]!.length > 0
  );

  const questionsAnswered = textAnswered && fileAnswered;

  const schedule = watch('interviewSchedule.scheduleList') || [];
  const hasSchedule = !needInterview || schedule.length > 0;

  console.log('basicFilled', basicFilled);
  console.log('additionalFilled', additionalFilled);
  console.log('questionsAnswered', questionsAnswered);
  console.log('hasSchedule', hasSchedule);

  const canSubmit =
    basicFilled && additionalFilled && questionsAnswered && hasSchedule;

  const onSubmit = useCallback(
    (vals: ApplicantForm) => {
      if (!data) return;

      let textIndex = 0;
      let fileIndex = 0;

      const answers = detailItems.reduce<
        { questionId: number; answerText: string; fileName: string }[]
      >((acc, item) => {
        if (item.type === 'text') {
          const raw = vals.questionAnswers[textIndex++] ?? '';
          const limitInfo = item.typeInfo.info;
          const limit =
            limitInfo === '제한 없음'
              ? Infinity
              : Number(limitInfo.replace('자', ''));
          const answer = raw.trim().slice(0, limit);

          // 필수가 아니고 빈 문자열이면 스킵
          if (!item.isEssential && !answer) return acc;

          acc.push({
            questionId: item.questionId,
            answerText: answer,
            fileName: '',
          });
        } else {
          const filesForQuestion = vals.questionFiles[fileIndex++] || [];
          filesForQuestion.forEach((f) => {
            acc.push({
              questionId: item.questionId,
              answerText: '',
              fileName: f.name,
            });
          });
        }

        return acc;
      }, []);

      const rawTimes = vals.interviewSchedule.scheduleList.flatMap((slot) => {
        const date = slot.date.replace(/\./g, '-');
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
        phoneNumber: vals.basicInfo.phone,
        gender: (vals.basicInfo.gender || 'MALE').toUpperCase() as
          | 'MALE'
          | 'FEMALE',
        recruitmentId: data.recruitmentId,
        positionId: vals.applicationPart?.id ?? null,
        answers,
        availableTimes,
        university: vals.additionalInfo.school ?? '',
        major: vals.additionalInfo.major ?? '',
        academicStatus: vals.additionalInfo.academicStatus ?? undefined,
        birthDate: vals.basicInfo.birthDate
          ? vals.basicInfo.birthDate.slice(0, 10)
          : '',
        address: vals.additionalInfo.address ?? '',
      };

      const profileImage = vals.additionalInfo.profileImage ?? undefined;
      const answerFiles: File[] = vals.questionFiles
        .flat()
        .filter((f): f is File => f instanceof File);
      console.log(payload);
      createApp.mutate(
        { payload, profileImage, answerFiles },
        {
          onSuccess: (res) => {
            router.replace(
              `/apply/${data.organizationName}/${slug}/submitted?title=${encodeURIComponent(data.title)}`
            );
            console.log('지원서 생성 성공 res:', res);
          },
          onError: (err) => {
            console.error('지원서 생성 에러:', err);
          },
        }
      );
    },
    [createApp, data, detailItems]
  );

  const navItems: NavItem[] = useMemo(() => {
    const items: NavItem[] = [];

    // 1) 기본정보
    items.push({ id: 'basic-name', label: '이름', required: true });
    if (needGender)
      items.push({ id: 'basic-gender', label: '성별', required: true });
    items.push({ id: 'basic-phone', label: '전화번호', required: true });
    if (needBirthDate)
      items.push({ id: 'basic-birthDate', label: '생년월일', required: true });
    items.push({ id: 'basic-email', label: '이메일', required: true });

    // 2) 추가정보
    if (needImage)
      items.push({ id: 'additional-image', label: '사진', required: true });
    if (needSchool)
      items.push({ id: 'additional-school', label: '학교', required: true });
    if (needAcademicStatus)
      items.push({
        id: 'additional-academicStatus',
        label: '학적 상태',
        required: true,
      });
    if (needMajor)
      items.push({ id: 'additional-major', label: '전공', required: true });
    if (needAddress)
      items.push({ id: 'additional-address', label: '주소', required: true });

    items.push({
      id: 'divider-additional-to-part',
      label: '',
      required: false,
      isDivider: true,
    });

    if (data.positions.length > 0)
      // 3) 지원 파트
      items.push({ id: 'part-select', label: '지원 파트', required: true });

    // 4) 질문
    detailItems
      .filter((d) => d.type === 'text')
      .forEach((d, idx) => {
        items.push({
          id: `question-text-${idx}`,
          label: d.description,
          required: d.isEssential,
        });
      });

    // 텍스트/파일 질문 사이에 구분선 추가
    if (
      detailItems.some((d) => d.type === 'text') &&
      detailItems.some((d) => d.type === 'file')
    ) {
      items.push({
        id: 'divider-questions',
        label: '',
        required: false,
        isDivider: true,
      });
    }

    detailItems
      .filter((d) => d.type === 'file')
      .forEach((d, idx) => {
        items.push({
          id: `question-file-${idx}`,
          label: d.description,
          required: d.isEssential,
        });
      });

    if (needInterview)
      // 5) 면접 일정
      items.push({
        id: 'interview-schedule',
        label: '면접 가능 일정 선택',
        required: true,
      });

    return items;
  }, [
    detailItems,
    needGender,
    needBirthDate,
    needSchool,
    needAcademicStatus,
    needMajor,
    needAddress,
  ]);

  const submitForm = handleSubmit(onSubmit);

  const handleModalClick = () => {
    confirm({
      type: 'info',
      title: '지원서를 제출하시겠습니까?',
      cancelText: '취소',
      confirmText: '제출',
      onConfirm: () => {
        submitForm();
      },
    });
  };

  return (
    <FormFieldStatusProvider>
      <PartStatusResetter
        selectedPartLabel={watch('applicationPart')?.label}
        detailItems={detailItems}
        commonTextCount={commonTextCount}
        commonFileCount={commonFileCount}
      />
      <div className={styles.page} ref={scrollRef}>
        <form className={styles.formWrapper}>
          <div className={styles.container}>
            <Flex direction="column" width="100%" gap="5rem" align="center">
              <Text variant="xl_title_semibold">
                [{data.organizationName}] {data.title}
              </Text>
              <div className={styles.headerWrapper}>
                {applicationSchedule.map((s, i) => (
                  <div key={i} className={styles.item}>
                    <Text
                      variant="md1_text_semibold"
                      color="grayscale70"
                      style={{ whiteSpace: 'nowrap' }}
                    >
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
                onImageChange={(f) =>
                  setValue('additionalInfo.profileImage', f)
                }
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
              parts={data.positions.map((p) => ({
                id: p.id,
                label: p.name,
              }))}
              selectedPartId={watch('applicationPart')?.id}
              onChange={(p: PartOption) => setValue('applicationPart', p)}
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
          </div>

          <div className={styles.saveButton}>
            <Button
              variant="main"
              size="40"
              width="10rem"
              disabled={!canSubmit}
              onClick={handleModalClick}
            >
              제출
            </Button>
          </div>
        </form>

        <FormNavigator items={navItems} scrollContainerRef={scrollRef} />
      </div>
    </FormFieldStatusProvider>
  );
}
