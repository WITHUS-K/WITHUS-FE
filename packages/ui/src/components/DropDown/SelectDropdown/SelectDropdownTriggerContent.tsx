import { IcDropdwonGray90 } from '../../../icons/src/colored';
import { arrowStyle, triggerStyle } from '../Dropdown.css';
import { useDropdownContext } from '../context';
import { Text, Flex } from '../..';

const SelectDropdownTriggerContent = ({
  selected,
  isDefault,
}: {
  selected: string;
  isDefault: boolean;
}) => {
  const { isOpen } = useDropdownContext();

  return (
    <div className={triggerStyle}>
      <Flex gap="1rem" align="center">
        <Text
          variant="md2_text_regular"
          color={isDefault ? 'grayscale40' : 'grayscale80'}
        >
          {selected}
        </Text>
      </Flex>
      <IcDropdwonGray90
        width={24}
        height={24}
        className={arrowStyle[isOpen ? 'open' : 'closed']}
      />
    </div>
  );
};

export default SelectDropdownTriggerContent;
