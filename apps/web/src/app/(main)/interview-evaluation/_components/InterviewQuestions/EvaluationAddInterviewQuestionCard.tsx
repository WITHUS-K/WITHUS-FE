'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import { Flex } from '@repo/ui/Flex';
import { IcPlusCircle } from '@repo/ui/icons/colored';
import { Memo } from '@repo/ui/Memo';
import { Text } from '@repo/ui/Text';

import * as styles from '../../../docs-evaluation/application/[id]/_components/EvaluationAddCommentCard/EvaluationAddCommentCard.css'; // ✅ 기존 카드 css 그대로 재사용
import { useUserStore } from '@web/store/state/userStore';

import { InterviewQuestion } from '@web/store/query/useTimeSlotApplicationsQuery';
import { useAddInterviewQuestionMutation } from '@web/store/mutation/useInterviewQuestionMutation';
import { useUpdateInterviewQuestionMutation } from '@web/store/mutation/useUpdateInterviewQuestionMutation';
import { useDeleteInterviewQuestionMutation } from '@web/store/mutation/useDeleteInterviewQuestionMutation';
import { getCookie } from 'cookies-next';

interface Props {
  /** 서버에서 내려온 전체 면접 질문(= 다른 사람 질문 포함) */
  questions: InterviewQuestion[];

  /** 내 userId (내 질문만 수정/삭제 가능) */
  myUserId: number;

  /** 질문 API가 timeSlotId를 필요로 하니까 */
  timeSlotId: number;

  /** (선택) 타이틀 커스텀 */
  title?: string;
  applicationId: number
}

export const EvaluationAddInterviewQuestionCard = ({
  questions,
  myUserId,
  timeSlotId,
  title = '면접 질문',
  applicationId
}: Props) => {
  const params = useParams();
  //const applicationId = Number(params.id);

  const userName = getCookie('name') as string;

  // ✅ 질문 mutation들
  const addQ = useAddInterviewQuestionMutation(applicationId, timeSlotId);
  const updateQ = useUpdateInterviewQuestionMutation(applicationId, timeSlotId);
  const deleteQ = useDeleteInterviewQuestionMutation(applicationId, timeSlotId);

  // ✅ 서버 props 갱신 반영
  const initialList = useMemo(() => questions ?? [], [questions]);
  const [questionList, setQuestionList] = useState<InterviewQuestion[]>(initialList);

  useEffect(() => {
    setQuestionList(initialList);
  }, [initialList]);

  const [isAdding, setIsAdding] = useState(false);
  const [newDraft, setNewDraft] = useState('');

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingDraft, setEditingDraft] = useState('');

  const today = new Date().toISOString().split('T')[0]!.replace(/-/g, '.');

  const handleAdd = () => {
    const content = newDraft.trim();
    if (!content) return;

    addQ.mutate(
      { content },
      {
        onSuccess: (newQ) => {
          // ✅ 서버가 createdAt을 안주면 today로 채움(필요 없으면 제거 가능)
          const createdAt = (newQ as any).createdAt ?? today;

          /*setQuestionList((prev) => [
            ...prev,
            { ...newQ, createdAt } as InterviewQuestion,
          ]);*/
          setNewDraft('');
          setIsAdding(false);
        },
      }
    );
  };

  const handleUpdate = (questionId: number) => {
    const content = editingDraft.trim();
    if (!content) return;

    updateQ.mutate(
      { questionId, content },
      {
        onSuccess: (updated) => {
          setQuestionList((prev) =>
            prev.map((q) =>
              q.id === questionId ? { ...q, content: updated.content } : q
            )
          );
          setEditingId(null);
          setEditingDraft('');
        },
      }
    );
  };

  const handleDelete = (questionId: number) => {
    deleteQ.mutate(
      { questionId },
      {
        onSuccess: () => {
          setQuestionList((prev) => prev.filter((q) => q.id !== questionId));
          if (editingId === questionId) {
            setEditingId(null);
            setEditingDraft('');
          }
        },
      }
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleWrap}>
        <Text variant="xl_title_bold" color="grayscale80">
          {title}
        </Text>
        <Text variant="xl_title_bold" color="primary50">
          {questionList.length}
        </Text>
      </div>

      <Flex direction="column" gap="2rem" align="center">
        {questionList.map((q) => {
          const isMine = q.user.userId === myUserId;
          const isEditing = editingId === q.id;

          return (
            <Memo
              key={q.id}
              author={q.user.name}
              date={(q as any).createdAt ?? today} // createdAt 없으면 today
              comment={q.content}
              isEditing={isEditing}
              draft={isEditing ? editingDraft : ''}

              // ✅ 수정 시작: 내 질문만 가능
              onEditStart={() => {
                if (!isMine) return;
                setEditingId(q.id);
                setEditingDraft(q.content);
              }}

              onDraftChange={setEditingDraft}

              // ✅ 제출: 내 질문만
              onSubmit={() => {
                if (!isMine) return;
                handleUpdate(q.id);
              }}

              // ✅ 삭제: 내 질문만
              onDelete={() => {
                if (!isMine) return;
                handleDelete(q.id);
              }}

              // ⭐️ 여기 핵심:
              // Memo가 "수정/삭제 UI를 항상 보여주는 컴포넌트"라면,
              // Memo 컴포넌트 내부에서 isMine 여부로 버튼 노출 제어가 필요해.
              // (아래에 Memo 개선안 같이 줄게)
            />
          );
        })}

        {isAdding && (
          <Memo
            author={userName}
            date={today}
            comment=""
            isEditing={true}
            draft={newDraft}
            onEditStart={() => {}}
            onDraftChange={setNewDraft}
            onSubmit={handleAdd}
            onDelete={() => {
              setIsAdding(false);
              setNewDraft('');
            }}
          />
        )}

        <button
          type="button"
          className={styles.addButton}
          onClick={() => setIsAdding(true)}
        >
          <IcPlusCircle width={24} height={24} />
          면접 질문 추가하기
        </button>
      </Flex>
    </div>
  );
};
