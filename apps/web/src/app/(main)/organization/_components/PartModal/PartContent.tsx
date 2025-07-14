'use client';
import { Flex } from '@repo/ui/Flex';
import { CheckBox } from '@repo/ui/CheckBox';
import { Tag } from '@repo/ui/Tag';
import { mapServerColorToTagHex } from '@web/utils/color';
import * as styles from './PartModal.css';

interface SimpleRole {
  id: number;
  roleName: string;
  color: string;
}

interface PartModalContentProps {
  allRoles: SimpleRole[];
  selectedRoleIds: number[];
  onToggle: (roleId: number) => void;
}

export const PartContent = ({
  allRoles,
  selectedRoleIds,
  onToggle,
}: PartModalContentProps) => {
  return (
    <div className={styles.listContainer}>
      {allRoles.map((role) => (
        <Flex
          key={role.id}
          align="center"
          gap="0.8rem"
          width="100%"
          justify="spaceBetween"
          className={styles.item}
          paddingBottom="1.7rem"
          paddingTop="1.7rem"
        >
          <Tag withCircle color={mapServerColorToTagHex(role.color)}>
            {role.roleName}
          </Tag>
          <CheckBox
            isChecked={selectedRoleIds.includes(role.id)}
            onChange={() => onToggle(role.id)}
          />
        </Flex>
      ))}
    </div>
  );
};
