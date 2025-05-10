'use client';
import * as styles from './Input.css';
import Flex from '../Flex/Flex';
import Text from '../Text/Text';

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  info?: string;
  infoDetail?: string;
}

export const QuestionInput = ({
  value,
  onChange,
  title = '질문 제목',
  info,
  infoDetail,
}: QuestionInputProps) => {
  return (
    <div className={styles.commentInputWrapper}>
      <Flex justify="spaceBetween" align="center" width="100%">
        <Text variant="md1_text_semibold" color="grayscale70">
          {title}
        </Text>
        <Text variant="sm_caption_medium" color="grayscale40">
          ({info} {infoDetail})
        </Text>
      </Flex>
      <div className={styles.commentDivider} />
      <textarea
        className={styles.commentInput}
        placeholder={'답변을 입력해주세요'}
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        rows={3}
      />
    </div>
  );
};
