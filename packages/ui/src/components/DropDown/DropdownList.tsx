import { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { useDropdownContext } from './context';
import { dropdownListWrapper, dropdownListInner } from './Dropdown.css';

export interface DropdownListProps extends ComponentPropsWithoutRef<'ul'> {
  width?: string;
}

export default function DropdownList({
  children,
  width,
  style: styleProp,
  ...props
}: DropdownListProps) {
  const { isOpen } = useDropdownContext();
  if (!isOpen) return null;

  const mergedStyle: CSSProperties = {
    ...(styleProp as CSSProperties),
    ...(width ? { width } : {}),
  };

  return (
    <div className={dropdownListWrapper} style={mergedStyle}>
      <ul className={dropdownListInner} {...props}>
        {children}
      </ul>
    </div>
  );
}
