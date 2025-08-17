'use client';
import React, { useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import { IcPlusCircle } from '@repo/ui/icons/colored';
import { Memo } from '@repo/ui/Memo';
import { Text } from '@repo/ui/Text';
import * as styles from './EvaluationAddCommentCard.css';
import {
  DocumentCommentItem,
  useAddDocumentCommentMutation,
  useDeleteDocumentCommentMutation,
  useUpdateDocumentCommentMutation,
} from '@web/store/mutation/useDocumentCommentMutations';
import { useUserStore } from '@web/store/state/userStore';
import { useParams } from 'next/navigation';

interface Comment extends DocumentCommentItem {}

interface Props {
  comments: Comment[];
}

interface EvaluationAddCommentCardProps {
  comments: Comment[];
  currentEvaluator?: string;
}

export const EvaluationAddCommentCard = ({ comments }: Props) => {
  const params = useParams();
  const applicationId = Number(params.id);
  const [commentList, setCommentList] = useState<Comment[]>(comments);
  const userName = useUserStore.getState().name;
  const addComment = useAddDocumentCommentMutation(applicationId);
  const updateComment = useUpdateDocumentCommentMutation(applicationId);
  const deleteComment = useDeleteDocumentCommentMutation(applicationId);

  const [isAdding, setIsAdding] = useState(false);
  const [newDraft, setNewDraft] = useState('');

  // 수정용
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingDraft, setEditingDraft] = useState('');

  // 날짜 포맷 YYYY.MM.DD
  const today = new Date().toISOString().split('T')[0]!.replace(/-/g, '.');

  const handleAdd = () => {
    const content = newDraft.trim();
    if (!content) return;
    addComment.mutate(
      { content, type: 'DOCUMENT' },
      {
        onSuccess: (newComment) => {
          setCommentList((prev) => [
            ...prev,
            { ...newComment, createdAt: today },
          ]);
          setNewDraft('');
          setIsAdding(false);
        },
      }
    );
  };

  const handleUpdate = (commentId: number) => {
    updateComment.mutate(
      { commentId, content: editingDraft },
      {
        onSuccess: (updated) => {
          setCommentList((prev) =>
            prev.map((c) =>
              c.id === commentId ? { ...c, content: updated.content } : c
            )
          );
          setEditingCommentId(null);
          setEditingDraft('');
        },
      }
    );
  };

  const handleDelete = (commentId: number) => {
    deleteComment.mutate(
      { commentId },
      {
        onSuccess: () => {
          setCommentList((prev) => prev.filter((c) => c.id !== commentId));
          if (editingCommentId === commentId) {
            setEditingCommentId(null);
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
          코멘트
        </Text>
        <Text variant="xl_title_bold" color="primary50">
          {commentList.length}
        </Text>
      </div>

      <Flex direction="column" gap="2rem" align="center">
        {commentList.map((c) => (
          <Memo
            key={c.id}
            author={c.user.name}
            date={c.createdAt}
            comment={c.content}
            isEditing={editingCommentId === c.id}
            draft={editingCommentId === c.id ? editingDraft : ''}
            onEditStart={() => {
              setEditingCommentId(c.id);
              setEditingDraft(c.content);
            }}
            onDraftChange={(val) => setEditingDraft(val)}
            onSubmit={() => handleUpdate(c.id)}
            onDelete={() => handleDelete(c.id)}
          />
        ))}

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
          코멘트 추가하기
        </button>
      </Flex>
    </div>
  );
};
