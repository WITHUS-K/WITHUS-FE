import React, { ReactNode } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { TextField } from '@repo/ui/TextField';
import * as styles from '../../app/(main)/application-list/setting/(preview)/_components/BasicInfoPreview/BasicInfoPreview.css';

interface InfoFieldProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  labelWidth?: string;
  itemClass?: string;
  wrapperClass?: string;
  children?: ReactNode;
  disabled?: boolean;
  inputProps?: React.ComponentProps<typeof TextField>['inputProps'];
  readOnly?: boolean;
}

export function InfoField({
  label,
  placeholder = '',
  required = false,
  labelWidth,
  itemClass = styles.rowItem,
  wrapperClass = styles.fieldWrapper,
  children,
  disabled = true,
  inputProps,
  readOnly = false,
}: InfoFieldProps) {
  return (
    <div className={itemClass}>
      {labelWidth ? (
        <Flex
          gap="0.4rem"
          align="center"
          width={labelWidth}
          style={{ whiteSpace: 'nowrap' }}
        >
          <Text variant="md1_text_semibold" color="grayscale70">
            {label}
          </Text>
          {required && !readOnly && (
            <Text variant="md2_text_semibold" color="error">
              *
            </Text>
          )}
        </Flex>
      ) : (
        <Flex gap="0.4rem" align="center">
          <Text variant="md1_text_semibold" color="grayscale70">
            {label}
          </Text>
          {required && !readOnly && (
            <Text variant="md2_text_semibold" color="error">
              *
            </Text>
          )}
        </Flex>
      )}

      <div className={wrapperClass}>
        {children ? (
          children
        ) : (
          <TextField
            inputProps={{
              placeholder,
              disabled,
              ...inputProps,
            }}
            //width="100%"
            readOnly={readOnly}
          />
        )}
      </div>
    </div>
  );
}
