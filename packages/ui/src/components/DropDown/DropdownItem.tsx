import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import { useDropdownContext } from './context';
import {
  dropdownItemBase,
  dropdownItemSelected,
  dropdownItemPadding,
  dropdownItemFont,
} from './Dropdown.css';
import clsx from 'clsx';

export interface DropdownItemProps extends ComponentPropsWithoutRef<'li'> {
  onSelect?: () => void;
  isSelected?: boolean;
  height?: string;
  /** 작은 텍스트 스타일 vs 큰 텍스트 스타일 */
  size?: 'small' | 'large';
  children: ReactNode;
}

export default function DropdownItem({
  onSelect,
  isSelected = false,
  height = '3.4rem',
  size = 'large',
  children,
  style,
  ...props
}: DropdownItemProps) {
  const { close } = useDropdownContext();

  // padding-inline 클래스 선택
  const paddingClass =
    typeof children === 'string'
      ? dropdownItemPadding.text
      : dropdownItemPadding.element;

  // font style 클래스 선택
  const fontClass =
    size === 'large' ? dropdownItemFont.large : dropdownItemFont.small;

  const className = clsx(
    dropdownItemBase,
    paddingClass,
    fontClass,
    isSelected && dropdownItemSelected
  );

  // 높이는 inline 스타일로만 덮어쓰기
  const mergedStyle: CSSProperties | undefined = height
    ? { ...style, height }
    : style;

  return (
    <li
      role="button"
      tabIndex={0}
      className={className}
      style={mergedStyle}
      onMouseDown={() => {
        onSelect?.();
        close();
      }}
      {...props}
    >
      {children}
    </li>
  );
}
