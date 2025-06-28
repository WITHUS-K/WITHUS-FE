import React from 'react';
import * as styles from './AdditionalInfoPreview.css';
import { SelectAcademicStatusDropdown } from '@repo/ui/DropDown';
import { InfoField } from '@web/components/InfoField/InfoField';

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
          <InfoField
            label="학교"
            placeholder="oo대학교"
            itemClass={styles.rowItemWide}
            wrapperClass={styles.fieldGrowForSchool}
          />
        )}

        {academicStatus && (
          <InfoField
            label="학적 상태"
            itemClass={styles.rowItemAuto}
            wrapperClass={styles.fieldAuto}
          >
            <SelectAcademicStatusDropdown onSelect={() => {}} />
          </InfoField>
        )}
      </div>

      {major && (
        <InfoField
          label="전공"
          placeholder="ooo학과"
          itemClass={styles.rowItemWide}
          wrapperClass={styles.fieldGrowForSchool}
        />
      )}

      {address && (
        <InfoField
          label="주소"
          placeholder="oo시 oo구 oo동"
          itemClass={styles.rowItemWide}
          wrapperClass={styles.fieldGrowForSchool}
        />
      )}
    </div>
  );
}
