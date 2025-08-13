'use client';

import { Flex } from '@repo/ui/Flex';
import { IcTimetablePlus } from '@repo/ui/icons/colored';
import { Profile } from '@repo/ui/Profile';
import * as styles from './CellRenders.css';
import { SlotItem } from '@web/constants/timetable';
import { TimeSlot } from '@web/store/query/useInterviewScheduleQuery';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { HoverCallout } from '@repo/ui/Callout';

export default function InterviewerCell({ slot }: { slot: TimeSlot }) {
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

  const openInviteModal = () =>
    withTimeSlot(`/interview-management/timetable/${tab}/${date}/invite`);

  return (
    <Flex
      align="center"
      width="100%"
      paddingLeft="3.7rem"
      paddingRight="3.7rem"
      gap="2rem"
    >
      <Flex align="center" justify="spaceBetween" width="100%">
        {slot.interviewers.map((person, i) => (
          <HoverCallout
            trigger={
              <div key={i}>
                <Profile
                  src={person.profileUrl}
                  alt={person.name}
                  size={24}
                  bordered
                />
              </div>
            }
            texts={person.name}
          />
        ))}
      </Flex>
      <HoverCallout
        trigger={
          <button className={styles.buttonStyle} onClick={openInviteModal}>
            <IcTimetablePlus width={16} height={16} />
          </button>
        }
        texts="지원자 / 면접관 / 안내자 추가"
      />
    </Flex>
  );
}
