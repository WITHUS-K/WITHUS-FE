'use client';
import React, { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import { DatePicker } from '@repo/ui/DatePicker';
import { IcImage } from '@repo/ui/icons/colored';
import { Option } from '@repo/ui/Option';
import { InfoField } from '@web/app/(main)/application-list/setting/preview/_components/InfoField/InfoField';
import { DateChip } from '@web/app/(main)/application-list/setting/preview/_components/DateChip/DateChip';
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
}

export function BasicInfoForm({
  value,
  file,
  onChange,
  onImageChange,
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
              alt={previewUrl}
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
            onChange={(e) => {
              const f = e.target.files?.[0] ?? null;
              onImageChange(f);
            }}
          />
        </div>

        <div className={styles.contentColumn}>
          <div className={styles.row}>
            {/* 이름 */}
            <InfoField
              label="이름"
              required
              labelWidth="7.4rem"
              disabled={false}
              inputProps={{
                placeholder: '홍길동',
                value: value.name,
                onChange: (e) => onChange('name', e.currentTarget.value),
              }}
            />

            {/* 성별 */}
            <InfoField
              label="성별"
              labelWidth="6.3rem"
              wrapperClass={styles.optionWrapper}
            >
              {(['male', 'female'] as const).map((g) => {
                const labelText = g === 'male' ? '남성' : '여성';
                return (
                  <Option
                    key={g}
                    type="radio"
                    label={labelText}
                    width="50%"
                    isSelected={selectedGender === g}
                    onChange={() => {
                      setSelectedGender(g);
                      onChange('gender', g);
                    }}
                  />
                );
              })}
            </InfoField>
          </div>

          <div className={styles.row}>
            {/* 전화번호 */}
            <InfoField
              label="전화번호"
              required
              disabled={false}
              inputProps={{
                placeholder: '010-0000-0000',
                value: value.phone,
                onChange: (e) => onChange('phone', e.currentTarget.value),
              }}
            />

            {/* 생년월일 */}
            <InfoField label="생년월일" disabled={false}>
              <div style={{ position: 'relative' }}>
                <DateChip
                  date={value.birthDate}
                  selected={isPickerOpen}
                  disabled={false}
                  onClick={() => setPickerOpen((prev) => !prev)}
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
                        value.birthDate ? parseISO(value.birthDate) : new Date()
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
          </div>

          {/* 이메일 */}
          <InfoField
            label="이메일"
            required
            labelWidth="7.5rem"
            disabled={false}
            inputProps={{
              placeholder: 'withus@email.com',
              value: value.email,
              onChange: (e) => onChange('email', e.currentTarget.value),
            }}
          />
        </div>
      </div>
    </div>
  );
}
