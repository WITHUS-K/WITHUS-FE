'use client';
import React, { useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import { IcPlusCircle } from '@repo/ui/icons/colored';
import { Memo } from '@repo/ui/Memo';
import { Text } from '@repo/ui/Text';
import * as styles from './EvaluationCommentCard.css';

export interface Comment {
  evaluator: string;
  comment: string;
}

interface EvaluationCommentCardProps {
  comments: Comment[];
  currentEvaluator?: string;
}

export const EvaluationCommentCard = ({
  comments,
  currentEvaluator = '크리스탈',
}: EvaluationCommentCardProps) => {
  const [commentList, setCommentList] = useState<Comment[]>(comments);

  return (
    <div className={styles.container}>
      <div className={styles.titleWrap}>
        <Text variant="xl_title_bold" color="grayscale80">
          코멘트
        </Text>
        <Text variant="xl_title_bold" color="primary50">
          {commentList.length}
        </Text>
      </div>

      <Flex direction="column" gap="2rem" align="center">
        {commentList.map((c, idx) => (
          <Memo
            key={idx}
            author={c.evaluator}
            comment={c.comment}
            isEditing={false}
            draft=""
            onEditStart={() => {}}
            onDraftChange={() => {}}
            onSubmit={() => {}}
          />
        ))}
      </Flex>
    </div>
  );
};
