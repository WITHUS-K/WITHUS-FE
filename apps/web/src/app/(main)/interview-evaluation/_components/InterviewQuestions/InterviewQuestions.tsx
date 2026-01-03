'use client';
import React, { useEffect, useState } from 'react';
import * as styles from './InterviewQuestions.css';
import { TextField } from '@repo/ui/InputField';
import { IcPlusCircle, IcPencil, IcDeleteInt } from '@repo/ui/icons/colored';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { useAddInterviewQuestionMutation } from '@web/store/mutation/useInterviewQuestionMutation';
import { InterviewQuestion } from '@web/store/query/useTimeSlotApplicationsQuery';
import { useUpdateInterviewQuestionMutation } from '@web/store/mutation/useUpdateInterviewQuestionMutation';
import { List } from '@repo/ui/List';
import { Text } from '@repo/ui/Text';
import { useDeleteInterviewQuestionMutation } from '@web/store/mutation/useDeleteInterviewQuestionMutation';

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
  const addQ = useAddInterviewQuestionMutation(applicationId, timeSlotId);
  const updateQ = useUpdateInterviewQuestionMutation(applicationId, timeSlotId);
  const deleteQ = useDeleteInterviewQuestionMutation(applicationId, timeSlotId);

  const [otherQs, setOtherQs] = useState<InterviewQuestion[]>([]);
  const [myRows, setMyRows] = useState<LocalQuestion[]>([]);
  const [newRows, setNewRows] = useState<string[]>([]);

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

  const handleDelete = (id: number) => {
    deleteQ.mutate(
      {
        questionId: id,
      },
      {
        onSuccess: () => {
          setMyRows((prev) => prev.filter((r) => r.id !== id));
        },
      }
    );
  };

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

  return (
    <Flex direction="column" width="100%" gap="1.6rem">
      <div className={styles.listContainer}>
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
                  <Flex gap="0.8rem">
                    <button
                      onClick={() => startEdit(r.id)}
                      className={styles.btn}
                    >
                      <IcPencil width={20} height={20} />
                      <Text variant="sm_caption_medium" color="grayscale30">
                        수정
                      </Text>
                    </button>

                    <button
                      onClick={() => handleDelete(r.id)}
                      className={styles.btn}
                    >
                      <IcDeleteInt width={20} height={20} />
                      <Text variant="sm_caption_medium" color="grayscale30">
                        삭제
                      </Text>
                    </button>
                  </Flex>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className={styles.container}>
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

        <button type="button" className={styles.addButton} onClick={addNewRow}>
          <IcPlusCircle width={24} height={24} />
          면접 질문 추가하기
        </button>
      </div>
    </Flex>
  );
};
