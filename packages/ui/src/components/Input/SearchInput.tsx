import { ChangeEvent, KeyboardEvent } from 'react';
import InputField from './InputField';
import { IcInputSearch, IcInputDelete } from '@repo/ui/icons/colored';

export interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  onClick?: () => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchInput({
  placeholder = '검색',
  value,
  onChange,
  width = '100%',
  onClick,
  onKeyDown,
}: SearchInputProps) {
  const handleClear = () => {
    onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <InputField
      size="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      width={width}
      onKeyDown={onKeyDown}
      icon={
        value ? (
          <button
            type="button"
            onClick={handleClear}
            style={{ height: '2.4rem' }}
          >
            <IcInputDelete width={24} height={24} />
          </button>
        ) : (
          <button type="button" onClick={onClick} style={{ height: '2.4rem' }}>
            <IcInputSearch width={24} height={24} />
          </button>
        )
      }
    />
  );
}
