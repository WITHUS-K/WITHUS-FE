'use client';
import React from 'react';
import { InfoField } from '@web/app/(main)/application-list/setting/preview/_components/InfoField/InfoField';
import { SelectAcademicStatusDropdown } from '@repo/ui/DropDown';
import * as styles from '../../../../application-list/setting/preview/_components/AdditionalInfoPreview/AdditionalInfoPreview.css';
import { TextField } from '@repo/ui/InputField';
import * as s from '../../../../application-list/setting/preview/_components/BasicInfoPreview/BasicInfoPreview.css';

interface AdditionalInfoFormProps {
  value: {
    school?: string;
    academicStatus?: string;
    major?: string;
    address?: string;
  };
  onChange: (field: keyof AdditionalInfoFormProps['value'], v: string) => void;
  readOnly?: boolean;
}

export function AdditionalInfoForm({
  value,
  onChange,
  readOnly = false,
}: AdditionalInfoFormProps) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {/* 학교 */}
        <InfoField
          label="학교"
          itemClass={styles.rowItemWide}
          wrapperClass={styles.fieldGrowForSchool}
          disabled={readOnly}
          readOnly={readOnly}
          inputProps={{
            disabled: readOnly,
            placeholder: 'oo대학교',
            value: value.school ?? '',
            onChange: (e) => onChange('school', e.currentTarget.value),
          }}
        />

        {/* 학적 상태 */}
        {readOnly ? (
          <div className={s.fieldWrapper}>
            <TextField
              inputProps={{
                value: value.academicStatus,
                width: '50%',
                disabled: readOnly,
              }}
              readOnly={readOnly}
            />
          </div>
        ) : (
          <InfoField
            label="학적 상태"
            itemClass={styles.rowItemAuto}
            wrapperClass={styles.fieldAuto}
            readOnly={readOnly}
          >
            <SelectAcademicStatusDropdown
              value={value.academicStatus}
              onSelect={(v) => !readOnly && onChange('academicStatus', v)}
            />
          </InfoField>
        )}
      </div>

      {/* 전공 */}
      <InfoField
        label="전공"
        itemClass={styles.rowItemWide}
        wrapperClass={styles.fieldGrowForSchool}
        disabled={readOnly}
        inputProps={{
          placeholder: 'ooo학과',
          value: value.major ?? '',
          onChange: (e) => onChange('major', e.currentTarget.value),
          disabled: readOnly,
        }}
        readOnly={readOnly}
      />

      {/* 주소 */}
      <InfoField
        label="주소"
        itemClass={styles.rowItemWide}
        wrapperClass={styles.fieldGrowForSchool}
        disabled={readOnly}
        readOnly={readOnly}
        inputProps={{
          placeholder: 'oo시 oo구 oo동',
          value: value.address ?? '',
          onChange: (e) => onChange('address', e.currentTarget.value),
          disabled: readOnly,
        }}
      />
    </div>
  );
}
