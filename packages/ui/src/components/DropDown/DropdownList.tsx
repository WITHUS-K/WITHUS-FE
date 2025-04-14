import { useDropdownContext } from './context';
import { dropdownListStyle } from './Dropdown.css';
import { ComponentPropsWithoutRef } from 'react';

const DropdownList = ({
  children,
  ...props
}: ComponentPropsWithoutRef<'ul'>) => {
  const { isOpen } = useDropdownContext();

  return isOpen ? (
    <ul className={dropdownListStyle} {...props}>
      {children}
    </ul>
  ) : null;
};

export default DropdownList;
