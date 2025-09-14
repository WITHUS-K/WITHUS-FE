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
  width?: string;
  height?: string;
  onFocus?: () => void;
  onBlur?: () => void;
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
  const { type, label, width = 'auto', height = '5.6rem', onFocus } = props;

  let control: JSX.Element;
  if (type === 'checkbox') {
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

  const handleClick = (e: React.MouseEvent) => {
    // input 자체를 클릭한 경우엔 input.onChange 에만 맡기고
    if (e.target instanceof HTMLInputElement) return;

    // checkbox/radio 타입일 때만 props.onChange 호출
    if (type === 'checkbox') {
      props.onChange();
    } else if (type === 'radio') {
      props.onChange();
    }
  };

  return (
    <Selectable
      width={width}
      height={height}
      isSelected={selected}
      disableHover={type === 'highlight'}
      onFocus={onFocus}
      onClick={handleClick}
    >
      <span style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center' }}>
        {control}
      </span>
      <Text
        variant="md2_text_medium"
        color={textColor}
        style={{
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          flex: 1,
          minWidth: 0,
          overflow: 'hidden',
          display: 'block',
        }}
      >
        {label}
      </Text>
    </Selectable>
  );
}
