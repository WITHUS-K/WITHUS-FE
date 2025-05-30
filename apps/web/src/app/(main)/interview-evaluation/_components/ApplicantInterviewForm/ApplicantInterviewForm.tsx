'use client';
import React, { useState } from 'react';
import * as styles from './ApplicantInterviewForm.css';
import { AccordianList, List } from '@repo/ui/List';
import { Divider } from '@repo/ui/Divider';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { FileUploader } from '@repo/ui/FileUploader';
import { InterviewQuestions } from '@web/app/(main)/interview-evaluation/_components/InterviewQuestions/InterviewQuestions';
import { SelectScoreDropdown } from '@repo/ui/DropDown';
import { CommentInput } from '@repo/ui/InputField';
import { IcSidebarInfo } from '@repo/ui/icons/mono';
import {
  CommentItem,
  TimeSlotApplication,
} from '@web/store/query/useTimeSlotApplicationsQuery';
import { useAddCommentMutation } from '@web/store/mutation/useAddCommentMutation';
import { useUpdateCommentMutation } from '@web/store/mutation/useUpdateCommentMutation';
import { useAddEvaluationMutation } from '@web/store/mutation/useAddEvaluationMutation';
import { useParams, useSearchParams } from 'next/navigation';
import { useUserStore } from '@web/store/state/userStore';
import { getOriginalFileName } from '@web/utils/file';
import { useFileDownload } from '@web/store/mutation/useFileDownload';
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';

export interface FileInfo {
  name: string;
  size: number;
  downloadUrl?: string;
}

interface ApplicantInterviewFormProps {
  detail: TimeSlotApplication;
}

export const ApplicantInterviewForm = ({
  detail,
}: ApplicantInterviewFormProps) => {
  const myUserId = useUserStore.getState().userId;
  const params = useParams();
  const timeSlotId = Number(params.id);
  const sp = useSearchParams();
  const recruitmentId = Number(sp.get('recruitmentId'));
  const { data: recruitmentDetail } = useRecruitmentDetailQuery(recruitmentId);

  console.log('타임슬롯', timeSlotId);

  const interviewCriteria =
    recruitmentDetail?.interviewEvaluationCriteria.filter(
      (c) => c.type === 'INTERVIEW'
    ) ?? [];

  console.log('면접', interviewCriteria);
  // Mutations
  const addComment = useAddCommentMutation(detail.applicationId, timeSlotId);
  const updateComment = useUpdateCommentMutation(
    detail.applicationId,
    timeSlotId
  );

  const addEvaluation = useAddEvaluationMutation(
    detail.applicationId,
    timeSlotId
  );

  const [scores, setScores] = useState<Record<number, string>>(() =>
    detail.evaluations.reduce(
      (acc, e) => {
        acc[e.criteria.id] = String(e.score);
        return acc;
      },
      {} as Record<number, string>
    )
  );

  const myDocumentComment =
    detail.documentComments.find((c: CommentItem) => c.user.userId === myUserId)
      ?.content ?? '';

  // 내 면접 코멘트
  const existingInterviewCommentItem = detail.interviewComments.find(
    (c: CommentItem) => c.user.userId === myUserId
  );
  // 2) 화면에 보여줄 내용만 추출
  const myInterviewComment = existingInterviewCommentItem?.content ?? '';

  const [newComment, setNewComment] = useState(myInterviewComment);
  const [isSubmitted, setIsSubmitted] = useState(
    !!existingInterviewCommentItem
  );

  const download = useFileDownload();

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    if (existingInterviewCommentItem) {
      // 수정: id가 있는 객체를 사용
      updateComment.mutate({
        commentId: existingInterviewCommentItem.id,
        content: newComment,
      });
    } else {
      addComment.mutate({ content: newComment, type: 'INTERVIEW' });
    }
    setIsSubmitted(true);
  };

  const handleScoreSelect = (criteriaId: number, score: string) => {
    setScores((s) => ({ ...s, [criteriaId]: score }));
    addEvaluation.mutate({
      applicationId: detail.applicationId,
      criteriaId,
      score: Number(score),
    });
  };

  const handleDownload = (file: FileInfo) => {
    download.mutate({
      imageUrl: file.downloadUrl!,
      fileName: file.name,
    });
  };

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
            items={detail.documentAnswers
              .filter((q) => q.questionType === 'TEXT')
              .map((q, i) => ({
                title: `${q.questionTitle}`,
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
                  name: getOriginalFileName(q.fileUrl!), // 혹은 실제 파일명 정보가 있다면 그걸 사용
                  downloadUrl: q.fileUrl!,
                  size: 10 * 1024 * 1024,
                }}
                onDownload={handleDownload}
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

          <InterviewQuestions
            existingQuestions={detail.interviewQuestions}
            applicationId={detail.applicationId}
            timeSlotId={timeSlotId}
            currentUserId={myUserId}
          />
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

          <Flex direction="column" width="100%" gap="1.6rem">
            {interviewCriteria.map((c) => (
              <Flex key={c.id} width="100%" gap="1.6rem">
                <AccordianList
                  items={[{ title: c.content, content: c.description }]}
                  isNumbering={false}
                  width="100%"
                />
                <SelectScoreDropdown
                  value={scores[c.id] ?? ''}
                  onSelect={(score) => handleScoreSelect(c.id, score)}
                  style={{ width: '16.6rem' }}
                />
              </Flex>
            ))}
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
          <div className={styles.comment}>{myDocumentComment}</div>
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
          {!isSubmitted ? (
            <CommentInput
              value={newComment}
              onChange={setNewComment}
              onSubmit={handleCommentSubmit}
            />
          ) : (
            <div className={styles.comment}>
              {newComment}
              <button
                type="button"
                className={styles.editButton}
                onClick={() => setIsSubmitted(false)}
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
