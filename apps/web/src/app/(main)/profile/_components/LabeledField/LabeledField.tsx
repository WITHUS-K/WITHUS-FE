'use client';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { TextField } from '@repo/ui/TextField';

interface LabeledFieldProps {
  label: string;
  readOnly?: boolean;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  width?: string;
  errorMessage?: string;
}

export default function LabeledField({
  label,
  readOnly,
  inputProps,
  width = '100%',
  errorMessage,
}: LabeledFieldProps) {
  return (
    <Flex gap="2rem" width="100%">
      <Text
        variant="md1_text_semibold"
        color="grayscale70"
        style={{ width: '16rem', marginTop: '1.2rem' }}
      >
        {label}
      </Text>
      <TextField
        readOnly={readOnly}
        inputProps={inputProps}
        width={width}
        errorMessage={errorMessage}
      />
    </Flex>
  );
}
