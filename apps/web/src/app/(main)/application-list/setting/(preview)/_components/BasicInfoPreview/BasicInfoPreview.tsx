import React from 'react';
import * as styles from './BasicInfoPreview.css';
import { Option } from '@repo/ui/Option';
import { IcImage } from '@repo/ui/icons/colored';
import { DateChip } from '@web/components/DateChip/DateChip';
import { InfoField } from '@web/components/InfoField/InfoField';

interface BasicInfoProps {
  gender: boolean;
  birthDate: boolean;
}

export function BasicInfoPreview({ gender, birthDate }: BasicInfoProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.imageContainer}>
          <IcImage width={36} height={36} className={styles.imageIcon} />
          <input type="file" disabled className={styles.imageInput} />
        </div>

        <div className={styles.contentColumn}>
          <div className={styles.row}>
            <InfoField
              label="이름"
              placeholder="홍길동"
              required
              labelWidth="7.4rem"
            />

            {gender && (
              <InfoField
                label="성별"
                labelWidth="6.3rem"
                wrapperClass={styles.optionWrapper}
              >
                <Option
                  width="49%"
                  type="radio"
                  label="남성"
                  isSelected={false}
                  onChange={() => {}}
                />
                <Option
                  width="49%"
                  type="radio"
                  label="여성"
                  isSelected={false}
                  onChange={() => {}}
                />
              </InfoField>
            )}
          </div>

          <div className={styles.row}>
            <InfoField label="전화번호" placeholder="010-0000-0000" required />

            {birthDate && (
              <InfoField label="생년월일">
                <DateChip />
              </InfoField>
            )}
          </div>

          <InfoField
            label="이메일"
            placeholder="withus@email.com"
            required
            labelWidth="7.5rem"
          />
        </div>
      </div>
    </div>
  );
}
