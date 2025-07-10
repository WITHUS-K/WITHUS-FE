'use client';
import { ComponentPropsWithoutRef, JSX, PropsWithChildren } from 'react';
import DropdownRoot from './DropdownRoot';
import DropdownTrigger from './DropdownTrigger';
import DropdownList, { DropdownListProps } from './DropdownList';
import DropdownItem, { DropdownItemProps } from './DropdownItem';
import DropdownListNormal, { DropdownListNormalProps } from './DropdownListNormal';

type DropdownProps = ComponentPropsWithoutRef<'div'>;

type DropdownComponent = (
  props: PropsWithChildren<DropdownProps>
) => JSX.Element;
type DropdownListComponent = (props: DropdownListProps) => JSX.Element | null;
type DropdownListNormalComponent = (props: DropdownListNormalProps) => JSX.Element | null;
type DropdownItemComponent = (
  props: PropsWithChildren<DropdownItemProps>
) => JSX.Element;

interface CompoundDropdown extends DropdownComponent {
  Trigger: typeof DropdownTrigger;
  List: DropdownListComponent;
  Item: DropdownItemComponent;
  NormalList : DropdownListNormalComponent
}

const Dropdown = (({
  children,
  ...props
}: PropsWithChildren<DropdownProps>) => {
  return <DropdownRoot {...props}>{children}</DropdownRoot>;
}) as CompoundDropdown;

Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;
Dropdown.NormalList = DropdownListNormal
export default Dropdown;
