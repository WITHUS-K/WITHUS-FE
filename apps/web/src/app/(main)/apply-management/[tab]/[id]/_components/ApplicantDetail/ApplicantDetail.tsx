'use client';
import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { BasicInfoForm } from '@web/app/(main)/apply-management/add/_components/BasicInfoForm/BasicInfoForm';
import { AdditionalInfoForm } from '@web/app/(main)/apply-management/add/_components/AdditionalInfoForm/AdditionalInfoForm';
import { QuestionAndFileListForm } from '@web/app/(main)/apply-management/add/_components/QuestionFileListForm/QuestionFileListForm';
import type { DetailItem } from '@web/types/application';
import * as styles from './ApplicantDetail.css';

import type {
  documentEvaluation as DocumentEvaluationType,
  DocumentEvaluationDataForUser,
} from '@web/types/document-evaluation';

type EvaluationType = DocumentEvaluationType | DocumentEvaluationDataForUser;

export interface ApplicantDetailProps<T extends EvaluationType> {
  evaluation: T;
  applicant: T['applicantList'][number];
}

export default function ApplicantDetail<T extends EvaluationType>({
  evaluation,
  applicant,
}: ApplicantDetailProps<T>) {
  const textItems: DetailItem[] = applicant.documentQuestion.map((dq, idx) => ({
    isEssential: true,
    type: 'text',
    description: dq.question,
    responseTarget: idx,
    typeInfo: dq.typeInfo,
  }));

  const fileItem: DetailItem = {
    isEssential: false,
    type: 'file',
    description: applicant.attachedFile.description,
    addDescription: applicant.attachedFile.addDescription,
    responseTarget: 0,
    typeInfo: applicant.attachedFile.typeInfo,
  };

  const detailItems = [...textItems, fileItem];

  const answers = applicant.documentQuestion.map((dq) => dq.answer);
  const files = applicant.attachedFile.files;

  const applicationSchedule = [
    { label: '지원 마감', date: evaluation.deadline },
    {
      label: '서류 합격 발표',
      date: evaluation.documentResult?.date || '',
    },
    {
      label: '면접 일정',
      date: evaluation.interviewSchedule?.scheduleList
        .map((s) => s.date)
        .join(', '),
    },
    {
      label: '최종 합격 발표',
      date: evaluation.finalResultDate,
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
          <div className={styles.title}>{evaluation.title}</div>
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

        {/* 기본/추가 정보(생략) */}
        <BasicInfoForm
          value={applicant.basicInfo}
          file={applicant.basicInfo.profileImage}
          onChange={() => {}}
          onImageChange={() => {}}
          readOnly
        />
        <AdditionalInfoForm
          value={applicant.additionalInfo}
          onChange={() => {}}
          readOnly
        />

        {/* 문항 + 파일 업로드(읽기전용) */}
        <QuestionAndFileListForm
          detailItems={detailItems}
          answers={answers}
          files={files}
          onAnswerChange={() => {}}
          onFileChange={() => {}}
          readOnly
        />
      </div>
    </Flex>
  );
}
