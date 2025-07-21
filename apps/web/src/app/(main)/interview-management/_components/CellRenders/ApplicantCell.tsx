'use client';

import { Flex } from '@repo/ui/Flex';
import { Chip } from '@repo/ui/Chips';
import { IcTimetableExpand } from '@repo/ui/icons/colored';
import * as styles from './CellRenders.css';
import { SlotItem } from '@web/constants/timetable';
import { TimeSlot } from '@web/store/query/useInterviewScheduleQuery';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { HoverCallout } from '@repo/ui/Callout';

export default function ApplicantCell({ slot }: { slot: TimeSlot }) {
  const router = useRouter();
  const params = useParams();
  const tab = params.tab as string;
  const date = params.date as string;
  const sp = useSearchParams();

  const baseQs = sp.toString();

  const withTimeSlot = (path: string) => {
    const newQs = `${baseQs}&timeSlotId=${slot.timeSlotId}`;
    router.push(`${path}?${newQs}`);
  };

  const openApplication = () =>
    withTimeSlot(
      `/interview-management/timetable/${tab}/${date}/application/${encodeURIComponent(
        `${slot.startTime}-${slot.endTime}`
      )}`
    );

  return (
    <Flex
      align="center"
      width="100%"
      paddingLeft="3.7rem"
      paddingRight="3.7rem"
      gap="2rem"
    >
      <Flex align="center" justify="spaceBetween" width="100%">
        {slot.applicants.map((name, i) => (
          <Chip key={i} bg="grayscale5" color="grayscale70">
            {name.name}
          </Chip>
        ))}
      </Flex>
      <HoverCallout
        trigger={
          <button className={styles.buttonStyle} onClick={openApplication}>
            <IcTimetableExpand width={16} height={16} />
          </button>
        }
        texts="자세히 보기"
      />
    </Flex>
  );
}
