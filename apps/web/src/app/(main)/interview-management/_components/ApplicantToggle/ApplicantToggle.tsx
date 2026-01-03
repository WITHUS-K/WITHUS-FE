import React, { useState, useMemo, useRef, useEffect } from 'react';
import * as styles from './ApplicantToggle.css';
import { Profile } from '@repo/ui/Profile';
import { Divider, Flex, Text } from '@repo/ui';
import { IcArrowDown } from '@repo/ui/icons/mono';

export interface ApplicantItem {
  id: number;
  name: string;
  imageUrl: string;
}

interface ApplicantToggleProps {
  applicants?: ApplicantItem[];
  currentId: number;
  onSelect: (id: number) => void;
}

const ApplicantToggle: React.FC<ApplicantToggleProps> = ({
  applicants = [],
  currentId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { selectedApplicant, otherApplicants } = useMemo(() => {
    if (!applicants || applicants.length === 0) {
      return { selectedApplicant: null, otherApplicants: [] };
    }
    const selected =
      applicants.find((a) => a.id === currentId) || applicants[0];
    const others = applicants.filter((a) => a.id !== selected?.id);
    return { selectedApplicant: selected, otherApplicants: others };
  }, [applicants, currentId]);

  const displayTarget = selectedApplicant || {
    id: -1,
    name: '-',
    imageUrl: '',
  };

  const otherCount = otherApplicants ? otherApplicants.length : 0;

  const handleToggle = () => {
    if (otherCount > 0) setIsOpen(!isOpen);
  };

  const handleSelect = (id: number) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        className={styles.header}
        onClick={handleToggle}
        disabled={otherCount === 0}
        type="button"
        aria-expanded={isOpen}
      >
        <div className={styles.headerContent}>
          <div className={styles.avatarWrapper}>
            <Profile
              size={32}
              src={displayTarget.imageUrl}
              alt={displayTarget.name}
            />

            {otherCount > 0 && (
              <div className={styles.countBadge}>+{otherCount}</div>
            )}
          </div>
        </div>

        {otherCount <= 0 && (
          <IcArrowDown className={styles.arrow} width={24} height={24} />
        )}

        {otherCount > 0 && (
          <IcArrowDown
            className={isOpen ? styles.chevronOpen : styles.arrow}
            width={24}
            height={24}
          />
        )}
      </button>

      {isOpen && (
        <div className={styles.listContainer}>
          <Flex direction="column" gap="1.2rem" marginBottom="1.2rem">
            <div className={styles.listTitle}>
              <Text variant="md2_text_medium" color="grayscale50">
                다른 지원자
              </Text>
            </div>
            <Divider length="100%" borderColor="grayscale10" />
          </Flex>

          {otherApplicants.map((applicant) => (
            <button
              key={applicant.id}
              className={styles.listItem}
              onClick={() => handleSelect(applicant.id)}
              type="button"
            >
              <Profile
                size={32}
                src={applicant.imageUrl}
                alt={applicant.name}
              />
              <span>{applicant.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantToggle;
