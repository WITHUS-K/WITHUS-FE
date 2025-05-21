import { useEffect, useRef } from 'react';
import * as styles from './Memo.css';
import { AvatarChip } from '../Avatar';
import { Profile } from '../Profile';
import { Flex } from '../Flex';
import { Text } from '../Text';
import { Divider } from '../Divider';
import { Button } from '../Button';

interface MemoProps {
  avatarUrl?: string;
  author: string;
  date?: string;
  comment: string;
  isEditing: boolean;
  draft: string;
  onEditStart: () => void;
  onDraftChange: (newValue: string) => void;
  onSubmit: () => void;
}

export const Memo = ({
  avatarUrl,
  author,
  date = '2024.04.30',
  comment,
  isEditing,
  draft,
  onEditStart,
  onDraftChange,
  onSubmit,
}: MemoProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing) textareaRef.current?.focus();
  }, [isEditing]);

  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        if (!isEditing) onEditStart();
      }}
    >
      <div className={styles.header}>
        <Flex align="center" gap="0.8rem" justify="center">
          {avatarUrl ? (
            <Profile src={avatarUrl} alt={author} />
          ) : (
            <AvatarChip label={author} />
          )}
          <Text variant="md2_text_medium" color="grayscale90">
            {author}
          </Text>
        </Flex>
        <Text variant="xs_caption_regular" color="grayscale50">
          {date}
        </Text>
      </div>

      <Divider length="100%" borderColor="grayscale10" />

      {isEditing ? (
        <Flex gap="1rem" direction="column">
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            rows={3}
          />
          <Button size="32" variant="sub" width="100%" onClick={onSubmit}>
            입력 완료
          </Button>
        </Flex>
      ) : (
        <Text
          variant="sm_caption_regular"
          color="grayscale60"
          className={styles.comment}
        >
          {comment}
        </Text>
      )}
    </div>
  );
};
