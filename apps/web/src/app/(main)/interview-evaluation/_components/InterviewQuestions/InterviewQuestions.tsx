'use client';
import React, { useEffect, useState } from 'react';
import * as styles from './InterviewQuestions.css';
import { TextField } from '@repo/ui/InputField';
import { IcDeleteLg, IcPlusCircle, IcPencil } from '@repo/ui/icons/colored';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { useParams } from 'next/navigation';
import { useAddInterviewQuestionMutation } from '@web/store/mutation/useInterviewQuestionMutation';
import { InterviewQuestion } from '@web/store/query/useTimeSlotApplicationsQuery';
import { useUpdateInterviewQuestionMutation } from '@web/store/mutation/useUpdateInterviewQuestionMutation';
import { List } from '@repo/ui/List';
import { Text } from '@repo/ui/Text';

interface InterviewQuestionsProps {
  existingQuestions: InterviewQuestion[];
  applicationId: number;
  timeSlotId: number;
  currentUserId: number;
}

interface LocalQuestion {
  id: number;
  content: string;
  editing: boolean;
  draft: string;
}

export const InterviewQuestions = ({
  existingQuestions,
  applicationId,
  timeSlotId,
  currentUserId,
}: InterviewQuestionsProps) => {
  // 질문 추가/수정 훅
  const addQ = useAddInterviewQuestionMutation(applicationId, timeSlotId);
  const updateQ = useUpdateInterviewQuestionMutation(applicationId, timeSlotId);

  // 다른 사람 질문
  const [otherQs, setOtherQs] = useState<InterviewQuestion[]>([]);
  // 내 질문 로컬 상태
  const [myRows, setMyRows] = useState<LocalQuestion[]>([]);
  // 새 질문 입력창
  const [newRows, setNewRows] = useState<string[]>([]);

  // 기존 질문이 바뀔 때마다 분리
  useEffect(() => {
    setOtherQs(
      existingQuestions.filter((q) => q.user.userId !== currentUserId)
    );
    setMyRows(
      existingQuestions
        .filter((q) => q.user.userId === currentUserId)
        .map((q) => ({
          id: q.id,
          content: q.content,
          editing: false,
          draft: q.content,
        }))
    );
  }, [existingQuestions, currentUserId]);

  // — 편집 핸들러들 —
  const startEdit = (id: number) =>
    setMyRows((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, editing: true, draft: r.content } : r
      )
    );

  const changeEdit = (id: number, text: string) =>
    setMyRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, draft: text } : r))
    );

  const submitEdit = (id: number) => {
    const row = myRows.find((r) => r.id === id)!;
    const content = row.draft.trim();
    if (!content) return;
    updateQ.mutate(
      { questionId: id, content },
      {
        onSuccess: (updated) => {
          setMyRows((prev) =>
            prev.map((r) =>
              r.id === id
                ? { ...r, content: updated.content, editing: false }
                : r
            )
          );
        },
      }
    );
  };

  // — 새 질문 핸들러들 —
  const onNewChange = (idx: number, text: string) =>
    setNewRows((prev) => {
      const a = [...prev];
      a[idx] = text;
      return a;
    });

  const submitNew = (idx: number) => {
    const content = newRows[idx]!.trim();
    if (!content) return;
    addQ.mutate(
      { content },
      {
        onSuccess: (newQ) => {
          setMyRows((prev) => [
            ...prev,
            {
              id: newQ.id,
              content: newQ.content,
              editing: false,
              draft: newQ.content,
            },
          ]);
          setNewRows((prev) => prev.filter((_, i) => i !== idx));
        },
      }
    );
  };

  const addNewRow = () => setNewRows((prev) => [...prev, '']);

  const totalExisting = otherQs.length + myRows.length;

  return (
    <Flex direction="column" width="100%" gap="1.6rem">
      <div className={styles.listContainer}>
        {/* — 1) 다른 사람 질문 리스트 — */}
        {otherQs.map((q, i) => (
          <List
            key={q.id}
            question={q.content}
            src={q.user.profileImageUrl ?? ''}
            alt={q.user.name}
            name={q.user.name}
            idx={i + 1}
          />
        ))}

        {/* — 2) 내 질문 리스트 — */}
        {myRows.map((r, idx) => {
          const number = otherQs.length + idx + 1;
          return (
            <div key={r.id}>
              {r.editing ? (
                <Flex width="100%" gap="1.6rem" align="center">
                  <TextField
                    inputProps={{
                      value: r.draft,
                      onChange: (e) => changeEdit(r.id, e.currentTarget.value),
                      placeholder: '면접 질문을 수정하세요.',
                      width: '100%',
                    }}
                  />
                  <Button
                    variant="sub"
                    size="56"
                    width="13.3rem"
                    onClick={() => submitEdit(r.id)}
                  >
                    입력 완료
                  </Button>
                </Flex>
              ) : (
                <div className={styles.editContainer}>
                  <Text variant="md2_text_medium" color="grayscale90">
                    {number}. {r.content}
                  </Text>
                  <button
                    onClick={() => startEdit(r.id)}
                    className={styles.btn}
                  >
                    <IcPencil width={20} height={20} />
                    <Text variant="sm_caption_medium" color="grayscale30">
                      수정하기
                    </Text>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.container}>
        {/* 입력 행들 */}
        {newRows.map((q, idx) => (
          <div key={idx} className={styles.questionRow}>
            <Flex width="100%" gap="1.6rem" align="center">
              <TextField
                inputProps={{
                  placeholder: '면접 질문을 입력해주세요.',
                  value: q,
                  onChange: (e) => onNewChange(idx, e.currentTarget.value),
                  width: '100%',
                }}
              />
              <Button
                variant="sub"
                size="56"
                width="13.3rem"
                onClick={() => submitNew(idx)}
              >
                입력 완료
              </Button>
            </Flex>
          </div>
        ))}

        {/* 질문 추가 버튼 */}
        <button type="button" className={styles.addButton} onClick={addNewRow}>
          <IcPlusCircle width={24} height={24} />
          면접 질문 추가하기
        </button>
      </div>
    </Flex>
  );
};
