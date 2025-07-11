'use client';

import React, { useState, useEffect, FocusEvent } from 'react';
import { parseISO } from 'date-fns';
import { DatePicker } from '@repo/ui/DatePicker';
import {
  IcImage,
  IcProfilePreview,
  IcProfilePreviewHover,
} from '@repo/ui/icons/colored';
import { Option } from '@repo/ui/Option';
import { InfoField } from '@web/components/InfoField/InfoField';
import { DateChip } from '@web/components/DateChip/DateChip';
import { TextField } from '@repo/ui/InputField';
import Image from 'next/image';
import * as styles from './BasicInfoForm.css';
import { Flex } from '@repo/ui/Flex';
import * as styles1 from '../../../../application-list/setting/(preview)/_components/AdditionalInfoPreview/AdditionalInfoPreview.css';
import { useFormFieldStatus } from '@web/app/apply/[organization]/[slug]/_context/FormFieldStatusContext';
import { focusableWrapper } from '@web/app/apply/[organization]/[slug]/_components/FormNavigator/FormNavigator.css';

interface BasicInfoFormProps {
  value: {
    name: string;
    gender?: 'male' | 'female';
    phone: string;
    birthDate?: string;
    email: string;
  };
  // file를 File 뿐 아니라 URL 문자열도 받을 수 있도록 확장
  file?: File | string | null;
  onChange: (field: keyof BasicInfoFormProps['value'], v: string) => void;
  onImageChange: (file: File | null) => void;
  needGender?: boolean;
  needBirthDate?: boolean;
  needImage?: boolean;
  readOnly?: boolean;
}

export function BasicInfoForm({
  value,
  file,
  onChange,
  onImageChange,
  needImage,
  needGender = true,
  needBirthDate = true,
  readOnly = false,
}: BasicInfoFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isIconHover, setIconHover] = useState(false);
  const nameStatus = useFormFieldStatus('basic-name');
  const genderStatus = useFormFieldStatus('basic-gender');
  const phoneStatus = useFormFieldStatus('basic-phone');
  const birthDateStatus = useFormFieldStatus('basic-birthDate');
  const emailStatus = useFormFieldStatus('basic-email');

  const handleBlurFactory =
    (status: ReturnType<typeof useFormFieldStatus>) =>
    (
      e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) =>
      e.currentTarget.value.trim()
        ? status.setCompleted()
        : status.setDefault();

  useEffect(() => {
    // File 객체인 경우 blob URL 생성
    if (file instanceof File) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(undefined);
      };
    }
    // URL 문자열인 경우 직접 사용
    if (typeof file === 'string') {
      setPreviewUrl(file);
      return;
    }
    // 파일 없을 때
    setPreviewUrl(undefined);
  }, [file]);

  const [selectedGender, setSelectedGender] = useState<
    'male' | 'female' | undefined
  >(value.gender);
  useEffect(() => {
    setSelectedGender(value.gender);
  }, [value.gender]);

  const [isPickerOpen, setPickerOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {needImage && (
          <div
            className={
              previewUrl
                ? styles.imageContainer.filled
                : styles.imageContainer.empty
            }
            onMouseEnter={() => setIconHover(true)}
            onMouseLeave={() => setIconHover(false)}
          >
            {previewUrl ? (
              <Image
                alt="프로필 이미지"
                src={previewUrl}
                className={styles.imagePreview}
                fill
              />
            ) : isIconHover ? (
              <IcProfilePreviewHover width={36} height={36} />
            ) : (
              <IcProfilePreview width={36} height={36} />
            )}

            {previewUrl && (
              <div className={styles.reuploadOverlay}>파일 다시 업로드</div>
            )}

            <input
              type="file"
              className={styles.imageInput}
              accept="image/*"
              onChange={(e) =>
                onImageChange(e.currentTarget.files?.[0] ?? null)
              }
              disabled={readOnly}
            />
          </div>
        )}

        <div className={styles.contentColumn}>
          <Flex gap="1.6rem" width="100%">
            <div id="basic-name" tabIndex={-1} className={focusableWrapper}>
              <InfoField
                label="이름"
                required
                labelWidth="7.4rem"
                itemClass={styles1.rowItemWide}
                wrapperClass={styles1.fieldGrowForSchool}
                disabled={readOnly}
                inputProps={{
                  placeholder: '홍길동',
                  value: value.name,
                  width: '100%',
                  onChange: (e) => {
                    onChange('name', e.currentTarget.value);
                    nameStatus.setEditing();
                  },
                  disabled: readOnly,
                  onFocus: nameStatus.setEditing,
                  onBlur: handleBlurFactory(nameStatus),
                }}
                readOnly={readOnly}
              />
            </div>

            {needGender &&
              (readOnly ? (
                <div className={styles.gender}>
                  <TextField
                    inputProps={{
                      value: value.gender == 'male' ? '남성' : '여성',
                      disabled: true,
                    }}
                    readOnly
                  />
                </div>
              ) : (
                <div
                  id="basic-gender"
                  tabIndex={-1}
                  className={focusableWrapper}
                >
                  <InfoField
                    label="성별"
                    labelWidth="6.3rem"
                    wrapperClass={styles1.fieldAuto}
                    itemClass={styles1.rowItemAuto}
                  >
                    <div style={{ display: 'flex', gap: '0.8rem' }}>
                      {(['male', 'female'] as const).map((g) => (
                        <Option
                          key={g}
                          type="radio"
                          label={g === 'male' ? '남성' : '여성'}
                          width="14.65rem"
                          isSelected={selectedGender === g}
                          onFocus={genderStatus.setEditing}
                          onBlur={genderStatus.setCompleted}
                          onChange={() => {
                            setSelectedGender(g);
                            onChange('gender', g);
                            genderStatus.setCompleted();
                          }}
                        />
                      ))}
                    </div>
                  </InfoField>
                </div>
              ))}
          </Flex>

          <Flex gap="1.6rem" width="100%">
            <div id="basic-phone" tabIndex={-1} className={focusableWrapper}>
              <InfoField
                label="전화번호"
                labelWidth="7.4rem"
                required
                itemClass={styles1.rowItemWide}
                wrapperClass={styles1.fieldGrowForSchool}
                disabled={readOnly}
                inputProps={{
                  placeholder: '010-0000-0000',
                  value: value.phone,
                  onChange: (e) => {
                    onChange('phone', e.currentTarget.value);
                    phoneStatus.setEditing();
                  },
                  disabled: readOnly,
                  width: '100%',
                  onFocus: phoneStatus.setEditing,
                  onBlur: handleBlurFactory(phoneStatus),
                }}
                readOnly={readOnly}
              />
            </div>

            {needBirthDate &&
              (readOnly ? (
                <div className={styles.fieldWrapper}>
                  <InfoField
                    label="생년월일"
                    required
                    labelWidth="7.4rem"
                    disabled={readOnly}
                    inputProps={{
                      value: value.birthDate ?? '',
                      disabled: true,
                      width: '100%',
                    }}
                    readOnly={readOnly}
                  />
                </div>
              ) : (
                <div
                  id="basic-birthDate"
                  tabIndex={-1}
                  className={focusableWrapper}
                >
                  <InfoField
                    label="생년월일"
                    itemClass={styles1.rowItemAuto}
                    wrapperClass={styles1.fieldAuto}
                  >
                    <div style={{ position: 'relative', width: '30rem' }}>
                      <DateChip
                        date={value.birthDate}
                        selected={isPickerOpen}
                        disabled={readOnly}
                        onFocus={birthDateStatus.setEditing}
                        onBlur={birthDateStatus.setCompleted}
                        onClick={() => setPickerOpen((o) => !o)}
                      />
                      {isPickerOpen && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            zIndex: 10,
                            marginTop: '0.4rem',
                          }}
                        >
                          <DatePicker
                            selectedDate={
                              value.birthDate
                                ? parseISO(value.birthDate)
                                : new Date()
                            }
                            onSelect={(date) => {
                              onChange('birthDate', date.toISOString());
                              setPickerOpen(false);
                              birthDateStatus.setCompleted();
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </InfoField>
                </div>
              ))}
          </Flex>

          <div id="basic-email" tabIndex={-1} className={focusableWrapper}>
            <InfoField
              label="이메일"
              required
              labelWidth="7.5rem"
              disabled={readOnly}
              inputProps={{
                placeholder: 'withus@email.com',
                value: value.email,
                onChange: (e) => {
                  onChange('email', e.currentTarget.value);
                  emailStatus.setEditing();
                },
                disabled: readOnly,
                width: '100%',
                onFocus: emailStatus.setEditing,
                onBlur: handleBlurFactory(emailStatus),
              }}
              readOnly={readOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
