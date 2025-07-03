'use client';

import React from 'react';
import { InfoField } from '@web/components/InfoField/InfoField';
import { SelectAcademicStatusDropdown } from '@repo/ui/DropDown';
import { TextField } from '@repo/ui/InputField';
import * as styles from '../../../../application-list/setting/(preview)/_components/AdditionalInfoPreview/AdditionalInfoPreview.css';
import * as s from '../../../../application-list/setting/(preview)/_components/BasicInfoPreview/BasicInfoPreview.css';

export const statusMap = {
  ENROLLED: '재학',
  GRADUATED: '졸업',
  LEAVE_OF_ABSENCE: '휴학',
  DEFERRED: '유예',
};

export type AcademicStatus = keyof typeof statusMap;
type DisplayStatus = (typeof statusMap)[AcademicStatus];

interface AdditionalInfoFormProps {
  value: {
    school?: string;
    academicStatus?: AcademicStatus;
    major?: string;
    address?: string;
  };
  onChange: (field: keyof AdditionalInfoFormProps['value'], v: string) => void;
  /** 화면 상에 각 필드를 보여줄지 결정하는 플래그 */
  needSchool?: boolean;
  needAcademicStatus?: boolean;
  needMajor?: boolean;
  needAddress?: boolean;
  readOnly?: boolean;
}

export function AdditionalInfoForm({
  value,
  onChange,
  needSchool = true,
  needAcademicStatus = true,
  needMajor = true,
  needAddress = true,
  readOnly = false,
}: AdditionalInfoFormProps) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {needSchool && (
          <InfoField
            label="학교"
            itemClass={styles.rowItemWide}
            wrapperClass={styles.fieldGrowForSchool}
            disabled={readOnly}
            readOnly={readOnly}
            inputProps={{
              placeholder: 'oo대학교',
              value: value.school ?? '',
              disabled: readOnly,
              onChange: (e) => onChange('school', e.currentTarget.value),
              width: '100%',
            }}
          />
        )}

        {needAcademicStatus &&
          (readOnly ? (
            <div className={s.fieldWrapper}>
              <InfoField
                label="학적 상태"
                itemClass={styles.rowItemWide}
                wrapperClass={styles.fieldGrowForSchool}
                readOnly={readOnly}
                inputProps={{
                  value: value.academicStatus
                    ? statusMap[value.academicStatus]
                    : '',
                  width: '100%',
                }}
              />
            </div>
          ) : (
            <InfoField
              label="학적 상태"
              itemClass={styles.rowItemAuto}
              wrapperClass={styles.fieldAuto}
              readOnly={readOnly}
              inputProps={{
                width: '100%',
              }}
            >
              <SelectAcademicStatusDropdown
                value={value.academicStatus}
                onSelect={(v) => !readOnly && onChange('academicStatus', v)}
              />
            </InfoField>
          ))}
      </div>

      {needMajor && (
        <InfoField
          label="전공"
          itemClass={styles.rowItemWide}
          wrapperClass={styles.fieldGrowForSchool}
          disabled={readOnly}
          readOnly={readOnly}
          inputProps={{
            placeholder: 'ooo학과',
            value: value.major ?? '',
            disabled: readOnly,
            onChange: (e) => onChange('major', e.currentTarget.value),
          }}
        />
      )}

      {needAddress && (
        <InfoField
          label="주소"
          itemClass={styles.rowItemWide}
          wrapperClass={styles.fieldGrowForSchool}
          disabled={readOnly}
          readOnly={readOnly}
          inputProps={{
            placeholder: 'oo시 oo구 oo동',
            value: value.address ?? '',
            disabled: readOnly,
            onChange: (e) => onChange('address', e.currentTarget.value),
          }}
        />
      )}
    </div>
  );
}
