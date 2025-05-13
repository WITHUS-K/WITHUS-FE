'use client';
import React from 'react';
import { InfoField } from '@web/app/(main)/application-list/setting/preview/_components/InfoField/InfoField';
import { SelectAcademicStatusDropdown } from '@repo/ui/DropDown';
import * as styles from '../../../../application-list/setting/preview/_components/AdditionalInfoPreview/AdditionalInfoPreview.css';

interface AdditionalInfoFormProps {
  value: {
    school?: string;
    academicStatus?: string;
    major?: string;
    address?: string;
  };
  onChange: (field: keyof AdditionalInfoFormProps['value'], v: string) => void;
}

export function AdditionalInfoForm({
  value,
  onChange,
}: AdditionalInfoFormProps) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {/* 학교 */}
        <InfoField
          label="학교"
          itemClass={styles.rowItemWide}
          wrapperClass={styles.fieldGrowForSchool}
          disabled={false}
          inputProps={{
            placeholder: 'oo대학교',
            value: value.school ?? '',
            onChange: (e) => onChange('school', e.currentTarget.value),
          }}
        />

        {/* 학적 상태 */}
        <InfoField
          label="학적 상태"
          itemClass={styles.rowItemAuto}
          wrapperClass={styles.fieldAuto}
        >
          <SelectAcademicStatusDropdown
            value={value.academicStatus}
            onSelect={(v) => onChange('academicStatus', v)}
          />
        </InfoField>
      </div>

      {/* 전공 */}
      <InfoField
        label="전공"
        itemClass={styles.rowItemWide}
        wrapperClass={styles.fieldGrowForSchool}
        disabled={false}
        inputProps={{
          placeholder: 'ooo학과',
          value: value.major ?? '',
          onChange: (e) => onChange('major', e.currentTarget.value),
        }}
      />

      {/* 주소 */}
      <InfoField
        label="주소"
        itemClass={styles.rowItemWide}
        wrapperClass={styles.fieldGrowForSchool}
        disabled={false}
        inputProps={{
          placeholder: 'oo시 oo구 oo동',
          value: value.address ?? '',
          onChange: (e) => onChange('address', e.currentTarget.value),
        }}
      />
    </div>
  );
}
