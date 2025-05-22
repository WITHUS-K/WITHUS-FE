'use client';
import React from 'react';
import Dropdown from '../Dropdown';
import StatusDropdownTriggerContent, {
  Status,
} from './StatusDropdownTriggerContent';

interface Props {
  /** 현재 선택된 상태 */
  status: Status;
  /** 선택이 바뀌었을 때 호출 */
  onChange: (newStatus: Status) => void;
  /** 탭 키 (문서 or 면접) */
  tab: 'documents' | 'interviews';
}

const documentOptions: Status[] = ['선택', '서류 합격', '서류 불합격', '보류'];
const interviewOptions: Status[] = ['선택', '면접 합격', '면접 불합격', '보류'];

export default function StatusDropdown({ status, onChange, tab }: Props) {
  const options = tab === 'documents' ? documentOptions : interviewOptions;

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <StatusDropdownTriggerContent status={status} />
      </Dropdown.Trigger>

      <Dropdown.List width="11rem">
        {options.map((opt) => (
          <Dropdown.Item
            key={opt}
            isSelected={opt === status}
            onSelect={() => onChange(opt)}
            height="2.9rem"
            size="small"
            style={{ justifyContent: 'center', padding: '' }}
          >
            {opt}
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
}
