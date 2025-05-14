'use client';
import React, { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import { DatePicker } from '@repo/ui/DatePicker';
import { IcImage } from '@repo/ui/icons/colored';
import { Option } from '@repo/ui/Option';
import { InfoField } from '@web/app/(main)/application-list/setting/preview/_components/InfoField/InfoField';
import { DateChip } from '@web/app/(main)/application-list/setting/preview/_components/DateChip/DateChip';
import { TextField } from '@repo/ui';
import * as styles from '../../../../application-list/setting/preview/_components/BasicInfoPreview/BasicInfoPreview.css';
import Image from 'next/image';

interface BasicInfoFormProps {
  value: {
    name: string;
    gender?: 'male' | 'female';
    phone: string;
    birthDate?: string;
    email: string;
  };
  file?: File | null;
  onChange: (field: keyof BasicInfoFormProps['value'], v: string) => void;
  onImageChange: (file: File | null) => void;
  readOnly?: boolean;
}

export function BasicInfoForm({
  value,
  file,
  onChange,
  onImageChange,
  readOnly = false,
}: BasicInfoFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string>();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(undefined);
      };
    }
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
        <div className={styles.imageContainer}>
          {previewUrl ? (
            <Image
              alt="프로필 이미지"
              src={previewUrl}
              className={styles.imagePreview}
              fill
            />
          ) : (
            <IcImage width={36} height={36} />
          )}
          <input
            type="file"
            className={styles.imageInput}
            accept="image/*"
            onChange={(e) => onImageChange(e.target.files?.[0] ?? null)}
            disabled={readOnly}
          />
        </div>

        <div className={styles.contentColumn}>
          {/* 1st row: Name & Gender */}
          <div className={styles.row}>
            {/* 이름 */}
            <InfoField
              label="이름"
              required
              labelWidth="7.4rem"
              disabled={readOnly}
              inputProps={{
                placeholder: '홍길동',
                value: value.name,
                onChange: (e) => onChange('name', e.currentTarget.value),
                disabled: readOnly,
              }}
              readOnly={readOnly}
            />

            {/* 성별 */}
            {readOnly ? (
              <div className={styles.fieldWrapper}>
                <TextField
                  inputProps={{
                    value: value.gender ?? '',
                    disabled: true,
                    width: '100%',
                  }}
                  readOnly
                />
              </div>
            ) : (
              <InfoField
                label="성별"
                labelWidth="6.3rem"
                wrapperClass={styles.optionWrapper}
              >
                {(['male', 'female'] as const).map((g) => (
                  <Option
                    key={g}
                    type="radio"
                    label={g === 'male' ? '남성' : '여성'}
                    width="50%"
                    isSelected={selectedGender === g}
                    onChange={() => {
                      setSelectedGender(g);
                      onChange('gender', g);
                    }}
                  />
                ))}
              </InfoField>
            )}
          </div>

          {/* 2nd row: Phone & BirthDate */}
          <div className={styles.row}>
            {/* 전화번호 */}
            <InfoField
              label="전화번호"
              labelWidth="7.4rem"
              required
              disabled={readOnly}
              inputProps={{
                placeholder: '010-0000-0000',
                value: value.phone,
                onChange: (e) => onChange('phone', e.currentTarget.value),
                disabled: readOnly,
              }}
              readOnly={readOnly}
            />

            {/* 생년월일 */}
            {readOnly ? (
              <div className={styles.fieldWrapper}>
                <TextField
                  inputProps={{
                    value: value.birthDate ?? '',
                    disabled: true,
                    width: '100%',
                  }}
                  readOnly
                />
              </div>
            ) : (
              <InfoField label="생년월일" disabled={readOnly}>
                <div style={{ position: 'relative' }}>
                  <DateChip
                    date={value.birthDate}
                    selected={isPickerOpen}
                    disabled={readOnly}
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
                        }}
                      />
                    </div>
                  )}
                </div>
              </InfoField>
            )}
          </div>

          {/* 3rd row: Email */}
          <InfoField
            label="이메일"
            required
            labelWidth="7.5rem"
            disabled={readOnly}
            inputProps={{
              placeholder: 'withus@email.com',
              value: value.email,
              onChange: (e) => onChange('email', e.currentTarget.value),
              disabled: readOnly,
            }}
            readOnly={readOnly}
          />
        </div>
      </div>
    </div>
  );
}
