import { dropdownItemStyle } from './Dropdown.css';
import { useDropdownContext } from './context';
import { Text } from '..';
import { ComponentPropsWithoutRef } from 'react';

interface DropdownItemProps extends ComponentPropsWithoutRef<'li'> {
  onSelect?: () => void;
}

const DropdownItem = ({ onSelect, children, ...props }: DropdownItemProps) => {
  const { close } = useDropdownContext();

  return (
    <li
      className={dropdownItemStyle}
      role="button"
      tabIndex={0}
      onMouseDown={() => {
        onSelect?.();
        close();
      }}
      {...props}
    >
      <Text variant="md2_text_medium">{children}</Text>
    </li>
  );
};

export default DropdownItem;
