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

import { useFileDownload } from '@web/store/mutation/useFileDownload';
import { useRecruitmentDetailQuery } from '@web/store/query/useRecruitmentDetailQuery';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { getOriginalFileName } from '@web/components/FileUpload/FileUpload';

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
  const { userId: myUserId } = getClientSideTokens();
  const params = useParams();
  const timeSlotId = Number(params.id);
  const sp = useSearchParams();
  const recruitmentId = Number(sp.get('recruitmentId'));

  // ssr 도입 시급!!
  const { data: recruitmentDetail } = useRecruitmentDetailQuery({
    recruitmentId,
  });
  console.log('공고', recruitmentDetail);
  const positionName = recruitmentDetail?.positions.find(
    (p) => p.id === detail.appliedPosition
  )?.name;

  // 해당 포지션의 Interview 평가 기준만 추출
  const allCriteria =
    recruitmentDetail?.interviewEvaluationCriteria.filter(
      (c) => c.type === 'INTERVIEW' && c.positionName === positionName
    ) ?? [];

  //console.log('타임슬롯', timeSlotId);

  const mergedCriteria = allCriteria.map((c) => {
    const existing = detail.evaluations.find(
      (e) => e.criteria.id === c.id && e.user.userId === myUserId // ← 여기서 내 userId 로 추가 필터링
    );

    return {
      id: c.id,
      content: c.content,
      description: c.description,
      // 내 평가가 있으면 그 점수, 없으면 null → SelectScoreDropdown 은 빈 값으로 렌더
      score: existing?.score ?? null,
    };
  });

  const [scores, setScores] = useState<Record<number, string>>(() =>
    mergedCriteria.reduce(
      (acc, c) => {
        if (c.score != null) acc[c.id] = String(c.score);
        return acc;
      },
      {} as Record<number, string>
    )
  );

  /*const interviewCriteria =
    recruitmentDetail?.interviewEvaluationCriteria.filter(
      (c) => c.type === 'INTERVIEW'
    ) ?? [];*/

  //console.log('면접', interviewCriteria);
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

  /*const [scores, setScores] = useState<Record<number, string>>(() =>
    detail.evaluations.reduce(
      (acc, e) => {
        acc[e.criteria.id] = String(e.score);
        return acc;
      },
      {} as Record<number, string>
    )
  );*/

  const myDocumentComments = detail.documentComments.filter(
    (c) => c.type === 'DOCUMENT' && c.user.userId === myUserId
  );

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

  const fileAnswers = detail.documentAnswers.filter(
    (q) => q.questionType === 'FILE'
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
    ('');
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
          작성 정보
        </Text>

        <Flex
          direction="column"
          align="flexStart"
          gap="1.6rem"
          width="100%"
          marginTop="2.4rem"
        >
          <Text variant="md2_text_semibold" color="grayscale70">
            질문 항목
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

        {fileAnswers.length > 0 && (
          <Flex
            direction="column"
            align="flexStart"
            gap="1.6rem"
            marginTop="3.2rem"
          >
            <Text variant="md2_text_semibold" color="grayscale70">
              첨부파일
            </Text>
            {fileAnswers.map((q) => (
              <FileUploader
                key={q.questionId}
                file={{
                  name: getOriginalFileName(q.fileUrl!, true),
                  downloadUrl: q.fileUrl!,
                  size: 10 * 1024 * 1024,
                }}
                onDownload={handleDownload}
              />
            ))}
          </Flex>
        )}
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
            {mergedCriteria.map((c) => (
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
          <Flex direction="column" width="100%" gap="1rem">
            {myDocumentComments.map((c) => (
              <div key={c.id} className={styles.comment}>
                {c.content}
              </div>
            ))}
          </Flex>
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
