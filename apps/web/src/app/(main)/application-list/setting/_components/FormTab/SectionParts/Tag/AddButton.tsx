import * as styles from '../SectionParts.css';
import { IcPlusCircle } from '@repo/ui/icons/mono';

export function AddButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <div
      className={disabled ? styles.addButtonDisabled : styles.addButtonEnabled}
      onClick={() => {
        if (!disabled) onClick();
      }}
    >
      <IcPlusCircle width={24} height={24} />
    </div>
  );
}
