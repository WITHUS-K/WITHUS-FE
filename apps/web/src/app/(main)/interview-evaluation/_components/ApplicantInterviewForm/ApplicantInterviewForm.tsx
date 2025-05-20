'use client';
import React, { useState } from 'react';
import * as styles from './ApplicantInterviewForm.css';
import { Applicant } from '@web/constants/timetable';
import { AccordianList, List } from '@repo/ui/List';
import { Divider } from '@repo/ui/Divider';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { FileUploader } from '@repo/ui/FileUploader';
import { InterviewQuestions } from '@web/app/(main)/interview-evaluation/_components/InterviewQuestions/InterviewQuestions';
import { SelectScoreDropdown } from '@repo/ui/DropDown';
import { CommentInput } from '@repo/ui/InputField';
import { IcSidebarInfo } from '@repo/ui/icons/mono';
import { TimeSlotApplication } from '@web/store/query/useTimeSlotApplicationsQuery';

interface ApplicantInterviewFormProps {
  detail: TimeSlotApplication;
}

export const ApplicantInterviewForm = ({
  detail,
}: ApplicantInterviewFormProps) => {
  const [interviewScore, setInterviewScore] = useState<string | undefined>();
  const [newDocComment, setNewDocComment] = useState('');
  const [isDocSubmitted, setIsDocSubmitted] = useState(false);

  const documentComment = detail.documentComments[0]?.content ?? '';
  const interviewComment = detail.interviewComments[0]?.content ?? '';

  return (
    <div className={styles.content}>
      <section aria-labelledby="self-intro-and-portfolio">
        <Text variant="lg_subtitle_semibold" color="grayscale90">
          자기소개서 & 포트폴리오
        </Text>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          width="100%"
          marginTop="2.4rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            자기소개서 문항
          </Text>

          <AccordianList
            items={detail.documentAnswers.map((q, i) => ({
              title: `${i + 1}. ${q.questionTitle}`,
              content: q.answerText,
              reviewers: [],
            }))}
            isNumbering
            width="100%"
          />
        </Flex>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          marginTop="3.2rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            포트폴리오
          </Text>
          {detail.documentAnswers
            .filter((q) => q.fileUrl)
            .map((q) => (
              <FileUploader
                key={q.questionId}
                file={{
                  name: `첨부파일_${q.questionId}`, // 혹은 실제 파일명 정보가 있다면 그걸 사용
                  downloadUrl: q.fileUrl!,
                  size: '0KB',
                }}
                onDownload={() => {}}
              />
            ))}
        </Flex>
      </section>

      <Divider borderColor="grayscale10" />

      <section aria-labelledby="interview-info">
        <Text variant="lg_subtitle_semibold" color="grayscale90">
          면접
        </Text>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          marginTop="4rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            면접 질문
          </Text>
          <InterviewQuestions />
          {detail.interviewQuestions.map((q, i) => (
            <List
              key={q.id}
              question={q.content}
              src={q.user.profileImageUrl ?? ''}
              alt={q.user.name}
              name={q.user.name}
              idx={i + 1}
            />
          ))}
        </Flex>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          marginTop="3.2rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            면접 평가
          </Text>

          <Flex width="100%" gap="1.6rem">
            <AccordianList
              items={detail.evaluations.map((e) => ({
                title: e.criteria.content,
                content: `점수: ${e.score}`,
              }))}
              isNumbering={false}
              width="100%"
            />
            <SelectScoreDropdown
              value={interviewScore}
              onSelect={setInterviewScore}
              style={{ width: '16.6rem' }}
            />
          </Flex>
        </Flex>
      </section>

      <Divider borderColor="grayscale10" />

      <section aria-labelledby="comment-content">
        <Text variant="lg_subtitle_semibold" color="grayscale90">
          코멘트
        </Text>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          marginTop="4rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            서류 평가
          </Text>
          <div className={styles.comment}>{documentComment}</div>
        </Flex>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          marginTop="3.2rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            면접 평가
          </Text>
          {!isDocSubmitted ? (
            <CommentInput
              value={newDocComment}
              onChange={setNewDocComment}
              onSubmit={() => {
                if (newDocComment.trim()) {
                  setIsDocSubmitted(true);
                }
              }}
            />
          ) : (
            <div className={styles.comment}>
              {newDocComment}
              <button
                type="button"
                className={styles.editButton}
                onClick={() => setIsDocSubmitted(false)}
              >
                <IcSidebarInfo width={20} height={20} />
                <Text variant="sm_caption_medium" color="grayscale30">
                  수정하기
                </Text>
              </button>
            </div>
          )}
        </Flex>
      </section>
    </div>
  );
};
