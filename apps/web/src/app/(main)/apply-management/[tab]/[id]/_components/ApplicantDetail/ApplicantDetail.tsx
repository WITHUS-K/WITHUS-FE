'use client';
import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { BasicInfoForm } from '@web/app/(main)/apply-management/add/_components/BasicInfoForm/BasicInfoForm';
import {
  AcademicStatus,
  AdditionalInfoForm,
} from '@web/app/(main)/apply-management/add/_components/AdditionalInfoForm/AdditionalInfoForm';
import { QuestionAndFileListForm } from '@web/app/(main)/apply-management/add/_components/QuestionFileListForm/QuestionFileListForm';
import type { documentEvaluation as DocumentEvaluationType } from '@web/types/document-evaluation';
import type { DetailItem } from '@web/types/application';
import * as styles from './ApplicantDetail.css';
import { ApplicationDetail } from '@web/store/query/useApplicationDetailQuery';

interface ApplicantDetailProps {
  application: ApplicationDetail;
}

export default function ApplicantDetail({ application }: ApplicantDetailProps) {
  const textItems: DetailItem[] = application.documentAnswers.map((a, idx) => ({
    isEssential: true,
    type: 'text',
    description: a.questionTitle,
    responseTarget: idx,
    typeInfo: { info: '', infoDetail: '' }, // 기존 구조에 맞춰 필요 시 추가
  }));

  const fileItem: DetailItem | undefined = application.documentAnswers.some(
    (a) => a.questionType === 'FILE'
  )
    ? {
        isEssential: false,
        type: 'file',
        description: '첨부파일',
        addDescription: '',
        responseTarget: 0,
        typeInfo: { info: '', infoDetail: '' },
      }
    : undefined;

  const detailItems = [...textItems, ...(fileItem ? [fileItem] : [])];

  const answers = application.documentAnswers.map((a) => a.answerText);
  const files = application.documentAnswers
    .filter((a) => a.questionType === 'FILE')
    .map((a) =>
      a.fileUrl
        ? {
            name: decodeURIComponent(a.fileUrl.split('/').pop() ?? '파일.pdf'),
            size: 0, // 서버에서는 알 수 없으므로 0 or unknown
            downloadUrl: a.fileUrl,
          }
        : null
    );

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
      paddingLeft="1.9rem"
      paddingRight="1.9rem"
      paddingBottom="2.4rem"
      width="100%"
    >
      <div className={styles.container}>
        <Flex direction="column" width="100%" gap="5rem">
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

        <Flex direction="column" gap="4rem" width="100%">
          <BasicInfoForm
            value={{
              name: application.name,
              phone: application.phoneNumber,
              birthDate: application.birthDate,
              gender: application.gender?.toLowerCase() as 'male' | 'female',
              email: application.email,
            }}
            file={application.imageUrl}
            onChange={() => {}}
            onImageChange={() => {}}
            readOnly
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
          />
        </Flex>

        <QuestionAndFileListForm
          detailItems={detailItems}
          answers={answers}
          files={files}
          onAnswerChange={() => {}}
          onFileChange={() => {}}
          readOnly={true}
        />
      </div>
    </Flex>
  );
}
