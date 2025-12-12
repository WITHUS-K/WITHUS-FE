'use client';

import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import SelectDropdownTriggerContent from './SelectDropdownTriggerContent';
import Dropdown from '../Dropdown';
import { triggerStyle } from '../Dropdown.css';

const emailDomains = [
  'naver.com',
  'daum.net',
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hanmail.net',
  'nate.com',
  '직접 입력',
];

export interface SelectDropdownProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onSelect'> {
  value?: string;
  onSelect: (val: string) => void;
  customPlaceholder?: string;
}

export default function SelectDropdown({
  value,
  onSelect,
  style,
  customPlaceholder = 'withus.com',
  ...rest
}: SelectDropdownProps) {
  const defaultValue = '선택해주세요';

  const [customMode, setCustomMode] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (value && !emailDomains.includes(value)) {
      setCustomMode(true);
      setCustomValue(value);
    } else if (!value) {
      setCustomMode(false);
      setCustomValue('');
    } else {
      setCustomMode(false);
    }
  }, [value]);

  useEffect(() => {
    if (customMode) inputRef.current?.focus();
  }, [customMode]);

  const handleSelect = (domain: string) => {
    if (domain === '직접 입력') {
      setCustomMode(true);
      if (!value || emailDomains.includes(value)) setCustomValue('');
      return;
    }
    setCustomMode(false);
    setCustomValue('');
    onSelect(domain);
  };

  const selected = value || defaultValue;
  const isDefault = selected === defaultValue;

  if (customMode) {
    return (
      <div {...rest} style={{ ...style }}>
        <div className={triggerStyle}>
          <input
            ref={inputRef}
            type="text"
            placeholder={customPlaceholder}
            value={customValue}
            onChange={(e) => {
              const v = e.target.value;
              setCustomValue(v);
              onSelect(v);
            }}
            style={{
              flex: 1,
              minWidth: 0,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              padding: 0,
              font: 'inherit',
              color: isDefault
                ? 'var(--colors-grayscale40)'
                : 'var(--colors-grayscale80)',
            }}
          />{' '}
        </div>
      </div>
    );
  }

  return (
    <Dropdown {...rest} style={style}>
      <Dropdown.Trigger>
        <SelectDropdownTriggerContent
          selected={selected}
          isDefault={isDefault}
        />
      </Dropdown.Trigger>

      <Dropdown.List
        width="16rem"
        style={{
          maxHeight: '20rem',
          overflowY: 'auto',
          overflowX: 'hidden',
          scrollbarWidth: 'none' as any,
          msOverflowStyle: 'none' as any,
        }}
      >
        <style>
          {`[data-hide-scrollbar]::-webkit-scrollbar { display: none; }`}
        </style>

        {emailDomains.map((domain) => (
          <Dropdown.Item
            key={domain}
            isSelected={domain === value}
            onSelect={() => handleSelect(domain)}
          >
            {domain}
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
}
