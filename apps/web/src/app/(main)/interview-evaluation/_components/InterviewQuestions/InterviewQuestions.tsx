'use client';
import React, { useState } from 'react';
import * as styles from './InterviewQuestions.css';
import { TextField } from '@repo/ui/InputField';
import { IcDeleteLg, IcPlusCircle } from '@repo/ui/icons/colored';

export const InterviewQuestions = () => {
  const [questions, setQuestions] = useState<string[]>(['']);

  const onChange = (idx: number, text: string) => {
    const copy = [...questions];
    copy[idx] = text;
    setQuestions(copy);
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, '']);
  };

  const removeQuestion = (idx: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className={styles.container}>
      {questions.map((q, idx) => (
        <div key={idx} className={styles.questionRow}>
          <div className={styles.questionWrapper}>
            <TextField
              inputProps={{
                placeholder: '면접 질문을 입력해주세요.',
                value: q,
                onChange: (e) => onChange(idx, e.currentTarget.value),
                width: '100%',
              }}
            />
          </div>

          {idx > 0 && (
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => removeQuestion(idx)}
            >
              <IcDeleteLg width={24} height={24} />
            </button>
          )}
        </div>
      ))}

      <button type="button" className={styles.addButton} onClick={addQuestion}>
        <IcPlusCircle width={24} height={24} />
        면접 질문 추가하기
      </button>
    </div>
  );
};
