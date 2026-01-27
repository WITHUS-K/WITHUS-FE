'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

import { Flex } from '@repo/ui/Flex';
import { IcPlusCircle } from '@repo/ui/icons/colored';
import { Memo } from '@repo/ui/Memo';
import { Text } from '@repo/ui/Text';

import * as styles from './EvaluationAddCommentCard.css';

import { useUserStore } from '@web/store/state/userStore';

// ✅ 기존(서류) mutation
import {
  DocumentCommentItem,
  useAddDocumentCommentMutation,
  useAddInterviewCommentMutation,
  useDeleteDocumentCommentMutation,
  useDeleteInterviewCommentMutation,
  useUpdateDocumentCommentMutation,
  useUpdateInterviewCommentMutation,
  InterviewCommentItem
} from '@web/store/mutation/useDocumentCommentMutations';
import { getCookie } from 'cookies-next';


type CommentType = 'DOCUMENT' | 'INTERVIEW';

// DocumentCommentItem / InterviewCommentItem 이 동일 구조면 이렇게 합쳐도 됨
type AnyComment = DocumentCommentItem | InterviewCommentItem;

interface Props {
  commentType?: CommentType;

  /** 서버에서 내려온 전체 코멘트 */
  comments: AnyComment[];

  /** true면 “내 코멘트만 보여줌” (요구사항: 면접 코멘트는 내 것만) */
  onlyMine?: boolean;

  /** 내 userId */
  myUserId?: number;
  applicationId?: number;
}

export const EvaluationAddCommentCard = ({
  commentType,
  comments,
  onlyMine = false,
  myUserId,
  applicationId: applicationIdProp
}: Props) => {
  const params = useParams();
  const applicationId = useMemo(() => {
    if (typeof applicationIdProp === 'number' && !Number.isNaN(applicationIdProp)) {
      return applicationIdProp;
    }
    const fromParams = Number((params as any)?.id);
    return fromParams;
  }, [applicationIdProp, params]);

  const userName = getCookie('name') as string;
  //const userName = cookieStore.get('name')

  //console.log("운영진 이름", userName);
  // ✅ commentType에 따라 mutation 스위칭
  const addDocument = useAddDocumentCommentMutation(applicationId);
  const updateDocument = useUpdateDocumentCommentMutation(applicationId);
  const deleteDocument = useDeleteDocumentCommentMutation(applicationId);

  const addInterview = useAddInterviewCommentMutation(applicationId);
  const updateInterview = useUpdateInterviewCommentMutation(applicationId);
  const deleteInterview = useDeleteInterviewCommentMutation(applicationId);

  const addMut = commentType === 'DOCUMENT' ? addDocument : addInterview;
  const updateMut = commentType === 'DOCUMENT' ? updateDocument : updateInterview;
  const deleteMut = commentType === 'DOCUMENT' ? deleteDocument : deleteInterview;

  // ✅ 목록은 props가 갱신될 수 있으니 memo로 “표시용” 만들고 state로 관리
  const visibleInitial = useMemo(() => {
    const base = comments ?? [];
    return onlyMine ? base.filter((c) => c.user.userId === myUserId) : base;
  }, [comments, onlyMine, myUserId]);

  const [commentList, setCommentList] = useState<AnyComment[]>(visibleInitial);

  useEffect(() => {
    setCommentList(visibleInitial);
  }, [visibleInitial]);

  const [isAdding, setIsAdding] = useState(false);
  const [newDraft, setNewDraft] = useState('');

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingDraft, setEditingDraft] = useState('');

  const today = new Date().toISOString().split('T')[0]!.replace(/-/g, '.');

  const title = commentType === 'DOCUMENT' ? '서류 코멘트' : '면접 코멘트';

  const handleAdd = () => {
    const content = newDraft.trim();
    if (!content) return;

    // ✅ 서버 타입값도 같이 전달
    addMut.mutate(
      { content },
      {
        onSuccess: (newComment: AnyComment) => {
          // onlyMine 모드(면접 코멘트)에서도 “내가 추가한 것”이므로 push OK
          setCommentList((prev) => [...prev, { ...newComment, createdAt: today } as AnyComment]);
          setNewDraft('');
          setIsAdding(false);
        },
      }
    );
  };

  const handleUpdate = (commentId: number) => {
    const content = editingDraft.trim();
    if (!content) return;

    updateMut.mutate(
      { commentId, content },
      {
        onSuccess: (updated: AnyComment) => {
          setCommentList((prev) =>
            prev.map((c) => (c.id === commentId ? { ...c, content: updated.content } : c))
          );
          setEditingCommentId(null);
          setEditingDraft('');
        },
      }
    );
  };

  const handleDelete = (commentId: number) => {
    deleteMut.mutate(
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
          {title}
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
