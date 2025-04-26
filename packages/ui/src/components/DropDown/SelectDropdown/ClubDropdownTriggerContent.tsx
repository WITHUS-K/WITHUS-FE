import { IcDropdwonGray90 } from '../../../icons/src/colored';
import { arrowStyle, clubTriggerStyle } from '../Dropdown.css';
import { useDropdownContext } from '../context';
import { Text } from '../..';

const ClubDropdownTriggerContent = ({ selected }: { selected: string }) => {
  const { isOpen } = useDropdownContext();

  return (
    <div className={clubTriggerStyle}>
      <Text variant="xl_title_semibold" color="black">
        {selected}
      </Text>
      <IcDropdwonGray90
        width={24}
        height={24}
        className={arrowStyle[isOpen ? 'open' : 'closed']}
      />
    </div>
  );
};

export default ClubDropdownTriggerContent;
