import React from 'react';
import * as pageStyles from '../../page.css';
import * as styles from './BasicInfoPreview.css';
import { TextField } from '@repo/ui/TextField';
import { Text } from '@repo/ui/Text';
import { Option } from '@repo/ui/Option';
import { IcImage } from '@repo/ui/icons/colored';
import { DateChip } from '@web/app/(main)/application-list/setting/preview/_components/DateChip/DateChip';
import { Flex } from '@repo/ui/Flex';

interface BasicInfoProps {
  gender: boolean;
  birthDate: boolean;
}

export function BasicInfoPreview({ gender, birthDate }: BasicInfoProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={pageStyles.imageContainer}>
          <IcImage width={36} height={36} className={pageStyles.imageIcon} />
          <input type="file" disabled className={pageStyles.imageInput} />
        </div>
        <div className={styles.contentColumn}>
          <div className={styles.row}>
            <div className={styles.rowItem}>
              <Flex gap="0.4rem" align="center" width="7.4rem">
                <Text variant="md1_text_semibold" color="grayscale70">
                  이름
                </Text>
                <Text variant="md2_text_semibold" color="error">
                  *
                </Text>
              </Flex>
              <div className={styles.fieldWrapper}>
                <TextField
                  inputProps={{
                    placeholder: '홍길동',
                    disabled: true,
                  }}
                  width="100%"
                />
              </div>
            </div>
            {gender && (
              <div className={styles.rowItem}>
                <div style={{ width: '6.3rem' }}>
                  <Text variant="md1_text_semibold" color="grayscale70">
                    성별
                  </Text>
                </div>
                <div className={styles.optionWrapper}>
                  <Option
                    width="100%"
                    type="radio"
                    label="남성"
                    isSelected={false}
                    onChange={() => {}}
                  />
                  <Option
                    width="100%"
                    type="radio"
                    label="여성"
                    isSelected={false}
                    onChange={() => {}}
                  />
                </div>
              </div>
            )}
          </div>

          <div className={styles.row}>
            <div className={styles.rowItem}>
              <Flex gap="0.4rem" align="center">
                <Text variant="md1_text_semibold" color="grayscale70">
                  전화번호
                </Text>
                <Text variant="md2_text_semibold" color="error">
                  *
                </Text>
              </Flex>
              <div className={styles.fieldWrapper}>
                <TextField
                  inputProps={{
                    placeholder: '010-0000-0000',
                    disabled: true,
                  }}
                  width="100%"
                />
              </div>
            </div>
            {birthDate && (
              <div className={styles.rowItem}>
                <Text variant="md1_text_semibold" color="grayscale70">
                  생년월일
                </Text>
                <div className={styles.fieldWrapper}>
                  <DateChip />
                </div>
              </div>
            )}
          </div>

          <div className={styles.rowItem}>
            <Flex gap="0.4rem" align="center" width="7.5rem">
              <Text variant="md1_text_semibold" color="grayscale70">
                이메일
              </Text>
              <Text variant="md2_text_semibold" color="error">
                *
              </Text>
            </Flex>
            <div className={styles.fieldWrapper}>
              <TextField
                inputProps={{
                  placeholder: 'withus@email.com',
                  disabled: true,
                }}
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
