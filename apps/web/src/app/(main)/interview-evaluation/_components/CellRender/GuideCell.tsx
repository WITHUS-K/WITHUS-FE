'use client';

import { Flex } from '@repo/ui/Flex';
import { IcTimetableExpand } from '@repo/ui/icons/colored';
import * as styles from './CellRenders.css';
import { SlotItem } from '@web/constants/timetable';
import { OverflowChips } from '@web/components/OverflowChips/OverflowChips';
import { TimeSlot } from '@web/store/query/useInterviewScheduleQuery';
import { HoverCallout } from '@repo/ui/Callout';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

export default function GuideCell({ slot }: { slot: TimeSlot }) {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const tab = params.tab as string;

  const handleClick = () => {
    const baseQs = searchParams.toString();
    const slotId = slot.timeSlotId;

    router.push(`/interview-evaluation/timetable/${tab}/${slotId}?${baseQs}`);
  };

  return (
    <Flex
      align="center"
      width="100%"
      paddingLeft="3.7rem"
      paddingRight="3.7rem"
      justify="spaceBetween"
    >
      {/* 안내자 Chip (3개 초과 시 +N 표시) */}
      <OverflowChips
        items={slot.assistants}
        renderLabel={(g) => g.name}
        maxVisible={3}
        gap="0.8rem"
      />

      {/* 돋보기 버튼 */}
      <HoverCallout
        trigger={
          <button className={styles.buttonStyle} onClick={handleClick}>
            <IcTimetableExpand width={16} height={16} />
          </button>
        }
        texts="자세히 보기"
      />
    </Flex>
  );
}
