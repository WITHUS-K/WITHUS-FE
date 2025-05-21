'use client';
import React, { useState } from 'react';
import * as styles from './InterviewQuestions.css';
import { TextField } from '@repo/ui/InputField';
import { IcDeleteLg, IcPlusCircle } from '@repo/ui/icons/colored';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { useParams } from 'next/navigation';
import { useAddInterviewQuestionMutation } from '@web/store/mutation/useInterviewQuestionMutation';

interface InterviewQuestionsProps {
  applicationId: number;
}

export const InterviewQuestions = ({
  applicationId,
}: InterviewQuestionsProps) => {
  const params = useParams();
  const timeSlotId = Number(params.id);
  const addQuestion = useAddInterviewQuestionMutation(
    applicationId,
    timeSlotId
  );
  const [questions, setQuestions] = useState<string[]>([]);

  const onChange = (idx: number, text: string) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[idx] = text;
      return copy;
    });
  };

  const handleSubmit = (idx: number) => {
    const content = questions[idx]?.trim();
    if (!content) return;
    addQuestion.mutate(
      { content },
      {
        onSuccess: () => {
          // on success, remove this row
          setQuestions((prev) => prev.filter((_, i) => i !== idx));
        },
      }
    );
  };

  const addRow = () => {
    setQuestions((prev) => [...prev, '']);
  };

  const removeRow = (idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className={styles.container}>
      {/* 입력 행들 */}
      {questions.map((q, idx) => (
        <div key={idx} className={styles.questionRow}>
          <Flex width="100%" gap="1.6rem" align="center">
            <TextField
              inputProps={{
                placeholder: '면접 질문을 입력해주세요.',
                value: q,
                onChange: (e) => onChange(idx, e.currentTarget.value),
                width: '100%',
              }}
            />
            <Button
              variant="sub"
              size="56"
              width="13.3rem"
              onClick={() => handleSubmit(idx)}
            >
              입력 완료
            </Button>
          </Flex>
          <button
            type="button"
            className={styles.removeButton}
            onClick={() => removeRow(idx)}
          >
            <IcDeleteLg width={24} height={24} />
          </button>
        </div>
      ))}

      {/* 질문 추가 버튼 */}
      <button type="button" className={styles.addButton} onClick={addRow}>
        <IcPlusCircle width={24} height={24} />
        면접 질문 추가하기
      </button>
    </div>
  );
};
