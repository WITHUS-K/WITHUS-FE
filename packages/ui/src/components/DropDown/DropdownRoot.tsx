import { DropdownContext } from './context';
import { dropdownRootStyle } from './Dropdown.css';
import { ComponentPropsWithoutRef, useRef } from 'react';
import { useOutsideClick, useOverlay } from '@repo/utils';
const DropdownRoot = ({
  children,
  ...props
}: ComponentPropsWithoutRef<'div'>) => {
  const { isOpen, open, close, toggle } = useOverlay();
  const ref = useOutsideClick(close);
  const triggerRef = useRef<HTMLElement>(null);
  return (
    <DropdownContext.Provider
      value={{ isOpen, open, close, toggle, triggerRef }}
    >
      <div ref={ref} className={dropdownRootStyle} {...props}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export default DropdownRoot;
