'use client';

import { Flex } from '@repo/ui/Flex';
import { Chip } from '@repo/ui/Chips';
import { Callout } from '@repo/ui/Callout';
import { ProfileGroup } from '@web/components/ProfileGroup/ProfileGroup';
import { IcTimetablePlus, IcTimetableExpand } from '@repo/ui/icons/colored';
import * as styles from './CellRenders.css';
import { SlotItem } from '@web/constants/timetable';
import { Text } from '@repo/ui/Text';
import { useRouter, useParams } from 'next/navigation';

export default function AllCell({ slot }: { slot: SlotItem }) {
  const router = useRouter();
  const params = useParams();
  const tab = params.tab as string;
  const date = params.date as string;

  // 모달 열기
  const openInviteModal = () => {
    router.push(
      `/interview-management/timetable/${tab}/${date}/(modal:invite)`
    );
  };

  return (
    <Flex
      align="center"
      width="100%"
      paddingLeft="3.7rem"
      paddingRight="3.7rem"
    >
      {/* 지원자 */}
      <Flex align="center" width="13.3rem" marginRight="4.1rem" gap="0.8rem">
        {slot.applicants.slice(0, 2).map((name) => (
          <Chip key={name} bg="grayscale5" color="grayscale70">
            {name}
          </Chip>
        ))}
        {slot.applicants.length > 2 && (
          <Callout
            trigger={
              <Text variant="xs_caption_medium" color="grayscale70">
                +{slot.applicants.length - 2}
              </Text>
            }
            texts={slot.applicants.slice(2)}
            position="bottom"
            offsetX="0.2rem"
          />
        )}
      </Flex>

      {/* 면접관 */}
      <Flex marginRight="5rem">
        <ProfileGroup items={slot.interviewers} maxVisible={3} size={23} />
      </Flex>

      {/* 안내자 */}
      <ProfileGroup items={slot.guides} maxVisible={2} size={23} />

      {/* 버튼 */}
      <Flex align="center" gap="0.4rem">
        <button className={styles.buttonStyle} onClick={openInviteModal}>
          <IcTimetablePlus width={16} height={16} />
        </button>
        <button className={styles.buttonStyle}>
          <IcTimetableExpand width={16} height={16} />
        </button>
      </Flex>
    </Flex>
  );
}
