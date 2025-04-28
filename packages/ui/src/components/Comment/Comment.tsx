import { Flex } from '../Flex';
import { Profile } from '../Profile/Profile';
import { Text } from '../Text';
import * as styles from './Comment.css';

interface UserProfile {
  name: string;
  src: string;
  alt: string;
}
interface CommentProps {
  user: UserProfile;
  comment: string;
}

export const Comment = ({ user, comment }: CommentProps) => {
  return (
    <Flex direction="column" align="flexStart" width="100%" gap="1.2rem">
      <Flex direction="row" align="center" gap="0.8rem" justify="center">
        <Profile src={user.src} alt={user.alt} />
        <Text variant="sm_caption_medium" color="grayscale90">
          {user.name}
        </Text>
      </Flex>
      <div className={styles.comment}>{comment}</div>
    </Flex>
  );
};
