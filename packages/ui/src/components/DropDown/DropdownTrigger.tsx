import { useDropdownContext } from './context';
import { PropsWithChildren } from 'react';

const DropdownTrigger = ({ children }: PropsWithChildren) => {
  const { toggle } = useDropdownContext();

  return (
    <button type="button" onClick={toggle}>
      {children}
    </button>
  );
};

export default DropdownTrigger;
