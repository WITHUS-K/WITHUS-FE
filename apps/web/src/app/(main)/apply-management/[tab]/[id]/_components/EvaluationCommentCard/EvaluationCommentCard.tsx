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
  profileUrl?: string;
  profileColor?: string;
}

interface EvaluationCommentCardProps {
  comments: Comment[];
}

export const EvaluationCommentCard = ({
  comments,
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

      <div className={styles.scroll}>
        <Flex
          direction="column"
          gap="2rem"
          align="center"
          paddingLeft="3.2rem"
          paddingRight="3.2rem"
        >
          {commentList.map((c, idx) => (
            <Memo
              key={idx}
              author={c.evaluator}
              comment={c.comment}
              isEditing={false}
              avatarUrl={c.profileUrl}
              serverColor={c.profileColor}
              admin={true}
              draft=""
              onEditStart={() => {}}
              onDraftChange={() => {}}
              onSubmit={() => {}}
              onDelete={() => {}}
            />
          ))}
        </Flex>
      </div>
    </div>
  );
};
