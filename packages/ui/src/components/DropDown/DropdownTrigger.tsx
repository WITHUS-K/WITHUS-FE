import { useDropdownContext } from './context';
import { PropsWithChildren } from 'react';

const DropdownTrigger = ({ children }: PropsWithChildren) => {
  const { toggle, triggerRef } = useDropdownContext();

  return (
    <button
      type="button"
      ref={triggerRef as any}
      onClick={toggle}
      style={{ border: 'none', background: 'none' }}
    >
      {children}
    </button>
  );
};

export default DropdownTrigger;
