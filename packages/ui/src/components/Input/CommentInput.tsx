'use client';
import * as styles from './Input.css';
import { Button } from '../Button';
import Flex from '../Flex/Flex';

interface CommentInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export const CommentInput = ({
  value,
  onChange,
  onSubmit,
  placeholder = '코멘트를 입력해주세요.',
}: CommentInputProps) => {
  return (
    <div className={styles.commentInputWrapper}>
      <textarea
        className={styles.commentInput}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        rows={5}
      />
      <div className={styles.commentDivider} />
      <Flex justify="spaceBetween" align="center" width="100%">
        <div />
        <Button size="40" onClick={onSubmit} width="13.3rem">
          완료
        </Button>
      </Flex>
    </div>
  );
};
