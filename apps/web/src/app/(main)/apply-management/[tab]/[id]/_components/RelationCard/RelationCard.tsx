'use client';

import { AvatarChip } from '@repo/ui/Avatar';
import * as styles from './RelationCard.css';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { useState } from 'react';
import { IcArrowDropdown } from '@repo/ui/icons/colored';
import { Profile } from '@repo/ui/Profile';

interface RelationCardProps {
  relations: Array<{
    name: string;
    profileColor?: string | null;
    profileUrl : string | null;
  }>;
}

export const RelationCard = ({ relations }: RelationCardProps) => {

  const [open, setOpen] = useState(false);
  
  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          all: 'unset',
          cursor: 'pointer',
          width: '100%',
          display: 'flex',
        }}
      >
<div className={styles.titleWrap}>
        <Text variant="xl_title_bold" color="grayscale80">
          지인 여부
        </Text>
        <Flex align='center' gap='1rem' >
        <Text variant="xl_title_bold" color="primary50">
          {relations.length}
        </Text>
        <span
        className={styles.iconColor}
              style={{
                display: 'inline-flex',
                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 150ms ease',
              }}
            >
              <IcArrowDropdown width={24} height={24} />
            </span>
        </Flex>
        
      </div>
      </button>
      
      {open && (
        <div className={styles.listContainer}>
{relations.map((r, i) => (
          <Flex key={`${r}-${i}`} gap="0.8rem" width='100%' align='center'>
             {r.profileUrl ? (
            <Profile src={r.profileUrl} alt={r.profileUrl} />
          ) : (
            <AvatarChip  label={r.name} index={i} serverColor={r.profileColor ?? undefined}/>
          )}
            <Text variant="md2_text_medium" color="grayscale90">
              {r.name}
            </Text>
          </Flex>
      ))}
</div>
        )}


      
    </div>
  );
};
