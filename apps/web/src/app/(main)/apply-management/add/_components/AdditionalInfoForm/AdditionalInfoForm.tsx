'use client';

import React, { FocusEvent } from 'react';
import { InfoField } from '@web/components/InfoField/InfoField';
import { SelectAcademicStatusDropdown } from '@repo/ui/DropDown';
import { TextField } from '@repo/ui/InputField';
import * as styles from '../../../../application-list/setting/(preview)/_components/AdditionalInfoPreview/AdditionalInfoPreview.css';
import * as s from '../../../../application-list/setting/(preview)/_components/BasicInfoPreview/BasicInfoPreview.css';
import { useFormFieldStatus } from '@web/app/[organization]/[slug]/_context/FormFieldStatusContext';
import { focusableWrapper } from '@web/app/[organization]/[slug]/_components/FormNavigator/FormNavigator.css';
import clsx from 'clsx';

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
  const schoolStatus = useFormFieldStatus('additional-school');
  const acadStatus = useFormFieldStatus('additional-academicStatus');
  const majorStatus = useFormFieldStatus('additional-major');
  const addressStatus = useFormFieldStatus('additional-address');

  const handleBlur =
    (status: ReturnType<typeof useFormFieldStatus>) =>
    (e: FocusEvent<HTMLInputElement>) =>
      e.currentTarget.value.trim()
        ? status.setCompleted()
        : status.setDefault();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        {needSchool && (
          <div
            id="additional-school"
            className={clsx(styles.rowItemWide, focusableWrapper)}
            tabIndex={-1}
          >
            <InfoField
              label="학교"
              labelWidth="7.6rem"
              itemClass={styles.rowItemWide}
              wrapperClass={styles.fieldGrowForSchool}
              disabled={readOnly}
              readOnly={readOnly}
              required
              inputProps={{
                placeholder: 'oo대학교',
                value: value.school ?? '',
                disabled: readOnly,
                onFocus: schoolStatus.setEditing,
                onBlur: handleBlur(schoolStatus),
                onChange: (e) => {
                  onChange('school', e.currentTarget.value);
                  schoolStatus.setEditing();
                },
                width: '100%',
              }}
            />
          </div>
        )}

        {needAcademicStatus &&
          (readOnly ? (
            <div className={s.fieldWrapper}>
              <InfoField
                label="학적 상태"
                required
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
            <div
              id="additional-academicStatus"
              tabIndex={-1}
              className={clsx(styles.rowItemAuto, focusableWrapper)}
            >
              <InfoField
                label="학적 상태"
                required
                itemClass={styles.rowItemAuto}
                wrapperClass={styles.fieldAuto}
                readOnly={readOnly}
                inputProps={{
                  width: '100%',
                }}
              >
                <SelectAcademicStatusDropdown
                  value={value.academicStatus}
                  onFocus={acadStatus.setEditing}
                  onBlur={(e) =>
                    e.currentTarget.textContent?.trim()
                      ? acadStatus.setCompleted()
                      : acadStatus.setDefault()
                  }
                  onSelect={(v) => {
                    onChange('academicStatus', v);
                    acadStatus.setCompleted();
                  }}
                />
              </InfoField>
            </div>
          ))}
      </div>

      {needMajor && (
        <div id="additional-major" tabIndex={-1} className={focusableWrapper}>
          <InfoField
            label="전공"
            required
            itemClass={styles.rowItemWide}
            wrapperClass={styles.fieldGrowForSchool}
            disabled={readOnly}
            readOnly={readOnly}
            inputProps={{
              placeholder: 'ooo학과',
              value: value.major ?? '',
              disabled: readOnly,
              onFocus: majorStatus.setEditing,
              onBlur: handleBlur(majorStatus),
              onChange: (e) => {
                onChange('major', e.currentTarget.value);
                majorStatus.setEditing();
              },
            }}
          />
        </div>
      )}

      {needAddress && (
        <div id="additional-address" tabIndex={-1} className={focusableWrapper}>
          <InfoField
            label="주소"
            required
            itemClass={styles.rowItemWide}
            wrapperClass={styles.fieldGrowForSchool}
            disabled={readOnly}
            readOnly={readOnly}
            inputProps={{
              placeholder: 'oo시 oo구 oo동',
              value: value.address ?? '',
              disabled: readOnly,
              onFocus: addressStatus.setEditing,
              onBlur: handleBlur(addressStatus),
              onChange: (e) => {
                onChange('address', e.currentTarget.value);
                addressStatus.setEditing();
              },
            }}
          />
        </div>
      )}
    </div>
  );
}
