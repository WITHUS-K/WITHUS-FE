import { ChangeEvent } from 'react';
import InputField from './InputField';
import { IcInputSearch, IcInputDelete } from '@repo/ui/icons/colored';

export interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  onClick?: () => void;
}

export default function SearchInput({
  placeholder = '검색',
  value,
  onChange,
  width = '100%',
  onClick,
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
      icon={
        value ? (
          <button type="button" onClick={handleClear}>
            <IcInputDelete width={24} height={24} />
          </button>
        ) : (
          <button type="button" onClick={onClick}>
            <IcInputSearch width={24} height={24} />
          </button>
        )
      }
    />
  );
}
