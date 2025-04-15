import DropdownRoot from '../DropdownRoot';
import DropdownList from '../DropdownList';
import DropdownItem from '../DropdownItem';
import DropdownTrigger from '../DropdownTrigger';
import SelectDropdownTriggerContent from './SelectDropdownTriggerContent';

const emailDomains = [
  'naver.com',
  'daum.net',
  'gmail.com',
  'yahoo.com',
  'outlook.com',
  'hanmail.net',
  'nate.com',
];

interface SelectDropdownProps {
  value?: string;
  onSelect: (val: string) => void;
}

const SelectDropdown = ({ value, onSelect }: SelectDropdownProps) => {
  const defaultValue = '선택해주세요';
  const selected = value ?? defaultValue;

  return (
    <DropdownRoot>
      <DropdownTrigger>
        <SelectDropdownTriggerContent
          selected={selected}
          isDefault={selected === defaultValue}
        />
      </DropdownTrigger>
      <DropdownList>
        {emailDomains.map((domain) => (
          <DropdownItem key={domain} onSelect={() => onSelect(domain)}>
            {domain}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownRoot>
  );
};

export default SelectDropdown;
