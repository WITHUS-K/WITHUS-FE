import React from 'react';
import * as styles from './AdditionalInfoPreview.css';
import { TextField } from '@repo/ui/TextField';
import { Text } from '@repo/ui/Text';
import { SelectAcademicStatusDropdown } from '@repo/ui/DropDown';

interface AdditionalProps {
  school: boolean;
  academicStatus: boolean;
  major: boolean;
  address: boolean;
}

export function AdditionalInfoPreview({
  school,
  academicStatus,
  major,
  address,
}: AdditionalProps) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {school && (
          <div className={styles.rowItemWide}>
            <Text variant="md1_text_semibold" color="grayscale70">
              학교
            </Text>
            <div className={styles.fieldGrowForSchool}>
              <TextField
                inputProps={{
                  placeholder: 'oo대학교',
                  disabled: true,
                }}
                width="100%"
              />
            </div>
          </div>
        )}

        {academicStatus && (
          <div className={styles.rowItemAuto}>
            <Text variant="md1_text_semibold" color="grayscale70">
              학적 상태
            </Text>
            <div className={styles.fieldAuto}>
              <SelectAcademicStatusDropdown onSelect={() => {}} />
            </div>
          </div>
        )}
      </div>

      {major && (
        <div className={styles.rowItemWide}>
          <Text variant="md1_text_semibold" color="grayscale70">
            전공
          </Text>
          <div className={styles.fieldGrowForSchool}>
            <TextField
              inputProps={{
                placeholder: 'ooo학과',
                disabled: true,
              }}
              width="100%"
            />
          </div>
        </div>
      )}

      {address && (
        <div className={styles.rowItemWide}>
          <Text variant="md1_text_semibold" color="grayscale70">
            주소
          </Text>
          <div className={styles.fieldGrowForSchool}>
            <TextField
              inputProps={{
                placeholder: 'oo시 oo구 oo동',
                disabled: true,
              }}
              width="100%"
            />
          </div>
        </div>
      )}
    </div>
  );
}
