'use client';
import React, { useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import { IcArrowDropdown, IcPlusCircle } from '@repo/ui/icons/colored';
import { Memo } from '@repo/ui/Memo';
import { Text } from '@repo/ui/Text';
import * as styles from './EvaluationCommentCard.css';

export interface Comment {
  evaluator: string;
  comment: string;
  profileUrl?: string;
  profileColor?: string;
}
type CardType = 'DOCUMENT_COMMENT' | 'INTERVIEW_COMMENT' | 'INTERVIEW_QUESTION';

interface EvaluationCommentCardProps {
  comments: Comment[];
  type: CardType;
}

export const EvaluationCommentCard = ({
  comments, type
}: EvaluationCommentCardProps) => {
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const [open, setOpen] = useState(false);
  
  const title =
    type === 'DOCUMENT_COMMENT'
      ? '서류 코멘트'
      : type === 'INTERVIEW_COMMENT'
      ? '면접 코멘트'
      : '면접 질문';
      
  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          all: 'unset',
          cursor: 'pointer',
          width: '100%',
          display: 'flex',
        }}
      >
 <div className={styles.titleWrap}>
        <Text variant="xl_title_bold" color="grayscale80">
          {title}
        </Text>
        <Flex align='center' gap='1rem' >
        <Text variant="xl_title_bold" color="primary50">
          {commentList.length}
        </Text>
        <span
        className={styles.iconColor}
              style={{
                display: 'inline-flex',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 150ms ease',
              }}
            >
              <IcArrowDropdown width={24} height={24} />
            </span>
        </Flex>
       
      </div>
      </button>
     

      {open && (
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
      )}
     
    </div>
  );
};
