'use client';

import { CheckBox } from '../CheckBox';
import { Radio } from '../Radio';
import { Selectable } from './Selectable/Selectable';
import { Text } from '..';
import { JSX } from 'react';

type OptionType = 'checkbox' | 'radio' | 'highlight';

interface BaseOptionProps {
  type: OptionType;
  label: string;
  /** ex: "auto", "21.6rem", "100%" */
  width?: string;
  /** ex: "3.5rem", "2.75rem", "4rem" */
  height?: string;
}

interface CheckboxOptionProps extends BaseOptionProps {
  type: 'checkbox';
  isChecked: boolean;
  onChange: () => void;
}

interface RadioOptionProps extends BaseOptionProps {
  type: 'radio';
  isSelected: boolean;
  onChange: () => void;
}

interface HighlightOptionProps extends BaseOptionProps {
  type: 'highlight';
}

export type OptionProps =
  | CheckboxOptionProps
  | RadioOptionProps
  | HighlightOptionProps;

/**
 * 하나의 컴포넌트로 checkbox, radio, highlight 옵션을 처리
 */
export function Option(props: OptionProps) {
  const { type, label, width = 'auto', height = '5.6rem' } = props;

  // 왼쪽 컨트롤 요소 분기
  let control: JSX.Element;
  if (type === 'checkbox') {
    // 이 블록 안에서만 props.isChecked, props.onChange 사용
    control = (
      <CheckBox isChecked={props.isChecked} onChange={props.onChange} />
    );
  } else if (type === 'radio') {
    control = <Radio isChecked={props.isSelected} onChange={props.onChange} />;
  } else {
    control = <span style={{ fontSize: '2rem', lineHeight: 2 }}>•</span>;
  }

  // 선택 상태 판별
  const selected =
    type === 'checkbox'
      ? props.isChecked
      : type === 'radio'
        ? props.isSelected
        : true;

  const textColor = selected ? 'primary50' : 'grayscale50';

  return (
    <Selectable
      width={width}
      height={height}
      isSelected={selected}
      disableHover={type === 'highlight'}
    >
      {control}
      <Text variant="md2_text_medium" color={textColor}>
        {label}
      </Text>
    </Selectable>
  );
}
