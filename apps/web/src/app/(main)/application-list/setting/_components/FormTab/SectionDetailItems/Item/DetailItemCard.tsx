'use client';

import React, { useEffect, useRef } from 'react';
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcTrash } from '@repo/ui/icons/colored';
import * as styles from '../SectionDetailItems.css';
import TextDetail from './TextDetail';
import FileDetail from './FileDetail';
import ResponseTargets from './ResponseTargets';
import {
  SimpleToggleSwitch,
  TextToggleSwitch,
} from '@repo/ui/SimpleToggleSwitch';
import { IcFileInfo } from '@repo/ui/icons/colored';
import * as C from '@web/constants/application';
import TypeControls from './TypeControls';
import { vars } from '@repo/theme';

interface Props {
  index: number;
  onRemove: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}

export default function DetailItemCard({
  index,
  onRemove,
  dragHandleProps,
}: Props) {
  const { control, setValue } = useFormContext();

  const type = useWatch({
    control,
    name: `detailItems.${index}.type`,
    defaultValue: 'text',
  }) as C.DetailType;

  const prevTypeRef = useRef<C.DetailType>(type);

  useEffect(() => {
    if (prevTypeRef.current !== type) {
      if (type === 'text') {
        setValue(`detailItems.${index}.typeInfo.info`, C.BLANK_OPTIONS[0]);
        setValue(`detailItems.${index}.typeInfo.infoDetail`, C.CHAR_LIMITS[2]);
      } else {
        setValue(`detailItems.${index}.typeInfo.info`, C.FILE_COUNTS[0]);
        setValue(`detailItems.${index}.typeInfo.infoDetail`, C.FILE_SIZES[2]);
      }
      prevTypeRef.current = type;
    }
  }, [type, index, setValue]);

  return (
    <div className={styles.itemWrapper}>
      <Flex width="100%" justify="center">
        <button
          type="button"
          aria-label="항목 순서 이동"
          className={styles.dragHandle}
          {...dragHandleProps}
        >
          <span
            style={{
              fontSize: 20,
              cursor: 'grab',
              display: 'inline-block',
              transform: 'rotate(90deg)',
              transformOrigin: '50% 50%',
              color: `${vars.colors.grayscale40}`,
            }}
          >
            ⋮⋮
          </span>
        </button>
      </Flex>

      <div className={styles.controlsContainer}>
        <ResponseTargets index={index} />
        <TypeControls index={index} type={type} />
      </div>

      {/* 헤더 + input */}
      <div className={styles.headerInputContainer}>
        <Flex align="center" justify="spaceBetween" width="100%">
          <Flex align="center" gap="1.2rem">
            <Controller
              name={`detailItems.${index}.type` as const}
              control={control}
              defaultValue="text"
              render={({ field }) => (
                <TextToggleSwitch
                  options={C.DETAIL_TYPE_OPTIONS}
                  selected={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {type === 'file' && (
              <Flex align="center" gap="0.2rem">
                <IcFileInfo width={24} height={24} />
                <Text variant="sm_caption_medium" color="grayscale30">
                  {C.UPLOAD_NOTICE}
                </Text>
              </Flex>
            )}
          </Flex>

          <Flex align="center" gap="1.2rem">
            <button type="button" onClick={onRemove}>
              <Text variant="md1_text_semibold" color="grayscale40">
                삭제
              </Text>
            </button>

            <Flex align="center" gap="0.8rem" height="3.2rem">
              <Text variant="md1_text_semibold" color="grayscale40">
                필수
              </Text>
              <Controller
                name={`detailItems.${index}.required` as const}
                control={control}
                render={({ field }) => (
                  <SimpleToggleSwitch
                    checked={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </Flex>
          </Flex>
        </Flex>

        {type === 'text' ? (
          <TextDetail index={index} />
        ) : (
          <FileDetail index={index} />
        )}
      </div>
    </div>
  );
}
