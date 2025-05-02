import { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { useDropdownContext } from './context';
import { dropdownListStyle } from './Dropdown.css';

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
    <ul className={dropdownListStyle} style={mergedStyle} {...props}>
      {children}
    </ul>
  );
}
