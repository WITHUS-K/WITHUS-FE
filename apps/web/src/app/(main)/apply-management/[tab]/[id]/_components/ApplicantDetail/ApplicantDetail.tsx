'use client';
import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { BasicInfoForm } from '@web/app/(main)/apply-management/add/_components/BasicInfoForm/BasicInfoForm';
import {
  AcademicStatus,
  AdditionalInfoForm,
} from '@web/app/(main)/apply-management/add/_components/AdditionalInfoForm/AdditionalInfoForm';
import {
  AnswerFile,
  QuestionAndFileListForm,
} from '@web/components/QuestionFileListForm/QuestionFileListForm';
import type { DetailItem, InterviewScheduleItem } from '@web/types/application';
import * as styles from './ApplicantDetail.css';
import { ApplicationDetail } from '@web/store/query/useApplicationDetailQuery';
import { Divider } from '@repo/ui';
import { useSearchParams } from 'next/navigation';
import { TimeRange } from '@web/components/TimeTable/SelectableTimeTable';
import InterviewScheduleViewer from '../InterviewScheduleViewer/InterviewScheduleViewer';
import { fi } from 'date-fns/locale';

interface ApplicantDetailProps {
  application: ApplicationDetail;
  scheduleMap?: Record<string, TimeRange[]>;
  interviewDuration?: number;
  applicantMap?: Record<string, InterviewScheduleItem[]>;
}

export default function ApplicantDetail({
  application,
  scheduleMap,
  interviewDuration,
  applicantMap,
}: ApplicantDetailProps) {
  const textItems: DetailItem[] = application.documentAnswers
    .filter((a) => a.questionType === 'TEXT')
    .map((a, idx) => ({
      required: true,
      type: 'text',
      description: a.questionTitle,
      responseTarget: idx,
      typeInfo: {
        info: `${a.textLimit}자`,
        infoDetail: a.includeWhitespace ? '공백포함' : '공백제외',
      },
      includeWhitespace: a.includeWhitespace,
      answer: a.answerText,
    }));

  const fileAnswers = application.documentAnswers.filter(
    (a) => a.questionType === 'FILE'
  );

  const fileByQuestion: Record<number, typeof fileAnswers> = fileAnswers.reduce(
    (acc, ans) => {
      (acc[ans.questionId] ??= []).push(ans);
      return acc;
    },
    {} as Record<number, typeof fileAnswers>
  );

  // 2) 질문 하나당 DetailItem 하나 생성
  const fileItems: DetailItem[] = Object.values(fileByQuestion).map(
    (answersForThisQuestion) => {
      const first = answersForThisQuestion[0];
      return {
        required: true,
        type: 'file',
        description: first!.questionTitle,
        addDescription: first!.questionDescription,
        // responseTarget는 QuestionAndFileListForm에서만 쓰므로, readOnly에선 무시해도 됩니다.
        typeInfo: {
          info: `${first!.maxFileCount}`,
          infoDetail: `${first!.maxFileSizeMb}`,
        },
        fileSize: first?.fileSize,

        // readOnly 모드에서만 쓰이는 answer 필드
        answer: '',
      };
    }
  );

  const detailItems = [...textItems, ...fileItems];

  //console.log('지원서', application);
  //const answers = application.documentAnswers.map((a) => a.answerText);
  const files1d = application.documentAnswers
    .filter((a) => a.questionType === 'FILE')
    .map((a) =>
      a.fileUrl
        ? {
            name: decodeURIComponent(a.fileUrl.split('/').pop()!),
            size: a.maxFileSizeMb,
            downloadUrl: a.fileUrl,
          }
        : null
    );

  const files2d: AnswerFile[][] = Object.values(fileByQuestion).map((group) =>
    group.map((a) => ({
      name: decodeURIComponent(a.fileUrl.split('/').pop()!),
      size: a.fileSize!,
      downloadUrl: a.fileUrl,
    }))
  );

  console.log('파일', files2d);

  const applicationSchedule = [
    { label: '지원 마감', date: application.documentDeadline },
    {
      label: '서류 합격 발표',
      date: application.documentResultDate,
    },
    {
      label: '면접 일정',
      date: application.interviewDates.join(', '),
    },
    {
      label: '최종 합격 발표',
      date: application.finalResultDate,
    },
  ];

  return (
    <Flex
      direction="column"
      //paddingLeft="1.9rem"
      //paddingRight="1.9rem"
      //paddingBottom="2.4rem"
      width="100%"
    >
      <div className={styles.container}>
        <Flex direction="column" width="100%" gap="3.2rem">
          <div className={styles.title}>{application.title}</div>
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

        <Flex direction="column" width="100%" gap="2.4rem" align="flexStart">
          <Flex align="center" gap="1.2rem">
            <Text variant="md2_text_medium" color="grayscale40">
              지원분야
            </Text>
            <Divider
              direction="column"
              length="2.4rem"
              borderColor="grayscale40"
            />
            <Text variant="md2_text_semibold" color="primary50">
              {application.appliedPosition}
            </Text>
          </Flex>

          <Divider direction="row" length="100%" borderColor="grayscale10" />
        </Flex>

        <Flex direction="column" gap="4rem" width="100%">
          <Flex direction="column" gap="4rem" width="100%">
            <BasicInfoForm
              value={{
                name: application.name,
                phone: application.phoneNumber,
                birthDate: application.birthDate ?? '',
                gender: application.gender?.toLowerCase() as
                  | 'male'
                  | 'female'
                  | undefined,
                email: application.email,
              }}
              file={application.imageUrl}
              onChange={() => {}}
              onImageChange={() => {}}
              readOnly
              needGender={!!application.gender}
              needBirthDate={!!application.birthDate}
            />
            <AdditionalInfoForm
              value={{
                school: application.university,
                academicStatus: application.academicStatus as AcademicStatus,
                major: application.major,
                address: application.address,
              }}
              onChange={() => {}}
              readOnly
              needSchool={!!application.university}
              needAcademicStatus={!!application.academicStatus}
              needMajor={!!application.major}
              needAddress={!!application.address}
            />
          </Flex>

          <QuestionAndFileListForm
            detailItems={detailItems}
            files={files2d}
            onAnswerChange={() => {}}
            onFileChange={() => {}}
            readOnly={true}
          />

          {scheduleMap &&
            Object.values(scheduleMap).some((arr) => arr.length > 0) && (
              <InterviewScheduleViewer
                scheduleMap={scheduleMap}
                applicantMap={applicantMap!}
                duration={interviewDuration!}
              />
            )}
        </Flex>
      </div>
    </Flex>
  );
}
