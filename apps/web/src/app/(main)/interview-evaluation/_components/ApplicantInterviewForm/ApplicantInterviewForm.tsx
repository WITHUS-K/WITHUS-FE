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

interface ApplicantInterviewFormProps {
  detail: TimeSlotApplication;
}

export const ApplicantInterviewForm = ({
  detail,
}: ApplicantInterviewFormProps) => {
  // zustand 로 바꾸기!!
  const myUserId = useUserStore.getState().userId;
  const params = useParams();
  const timeSlotId = Number(params.id);
  console.log('타임슬롯', timeSlotId);
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

  const [newComment, setNewComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

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
                  name: `첨부파일_${q.questionId}`, // 혹은 실제 파일명 정보가 있다면 그걸 사용
                  downloadUrl: q.fileUrl!,
                  size: 5,
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
          <InterviewQuestions applicationId={detail.applicationId} />
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
            {detail.evaluations.map((e) => (
              <Flex
                key={e.criteria.id}
                width="100%"
                gap="1.6rem"
                align="center"
              >
                {/* 한 개짜리 아코디언 리스트 */}
                <AccordianList
                  items={[
                    { title: e.criteria.content, content: `점수: ${e.score}` },
                  ]}
                  isNumbering={false}
                  width="100%"
                />
                <SelectScoreDropdown
                  value={scores[e.criteria.id]}
                  onSelect={(score) => handleScoreSelect(e.criteria.id, score)}
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
