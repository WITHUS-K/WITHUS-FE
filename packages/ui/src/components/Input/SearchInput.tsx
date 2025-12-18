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
  keepSearchIcon?: boolean;
  isLoading?: boolean;
}

export default function SearchInput({
  placeholder = '검색',
  value,
  onChange,
  width = '100%',
  onClick,
  onKeyDown,
  keepSearchIcon = false,
  isLoading = false,
}: SearchInputProps) {
  const handleClear = () => {
    onChange({ target: { value: '' } } as ChangeEvent<HTMLInputElement>);
  };

  const renderIcon = () => {
    if (isLoading) {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.4rem',
            height: '2.4rem',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '1.8rem',
              height: '1.8rem',
              border: '2px solid rgba(0, 0, 0, 0.1)',
              borderTop: '2px solid #999BB4',
              borderRadius: '50%',
              animation: 'spinSearchInput 0.8s linear infinite',
              boxSizing: 'border-box',
            }}
          />
          <style>{`
        @keyframes spinSearchInput {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
      );
    }

    // --- Search 아이콘 유지 모드 ---
    if (keepSearchIcon) {
      return (
        <button type="button" onClick={onClick} style={{ height: '2.4rem' }}>
          <IcInputSearch width={24} height={24} />
        </button>
      );
    }

    // --- 기존 behavior ---
    return value ? (
      <button type="button" onClick={handleClear} style={{ height: '2.4rem' }}>
        <IcInputDelete width={24} height={24} />
      </button>
    ) : (
      <button type="button" onClick={onClick} style={{ height: '2.4rem' }}>
        <IcInputSearch width={24} height={24} />
      </button>
    );
  };

  return (
    <InputField
      size="search"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      width={width}
      onKeyDown={onKeyDown}
      icon={renderIcon()}
    />
  );
}
