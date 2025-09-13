import { ComponentPropsWithoutRef, CSSProperties, ReactNode } from 'react';
import { useDropdownContext } from './context';
import {
  dropdownItemBase,
  dropdownItemSelected,
  dropdownItemPadding,
  dropdownItemFont,
  dropdownItemLabel,
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

  const paddingClass =
    typeof children === 'string'
      ? dropdownItemPadding.text
      : dropdownItemPadding.element;

  const fontClass =
    size === 'large' ? dropdownItemFont.large : dropdownItemFont.small;

  const className = clsx(
    dropdownItemBase,
    paddingClass,
    fontClass,
    isSelected && dropdownItemSelected
  );

  const mergedStyle: CSSProperties | undefined = height
    ? { ...style, height }
    : style;

  const content =
    typeof children === 'string' ? (
      <span className={dropdownItemLabel} title={children}>
        {children}
      </span>
    ) : (
      children
    );

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
      {content}
    </li>
  );
}
