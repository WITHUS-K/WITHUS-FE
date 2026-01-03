import type { Meta, StoryObj } from '@storybook/react';
import { ExpandableList, ExpandableItemType } from './ExpandableList';

// 더미 데이터 생성
const MOCK_REVIEWERS = [
  { name: '김코딩', avatar: '', score: 4.5 },
  { name: '이디자', avatar: '', score: 5.0 },
];

const MOCK_ITEMS: ExpandableItemType[] = [
  {
    title: '짧은 답변이 있는 질문입니다.',
    content:
      '이 답변은 한 줄을 넘어가지 않아서 접혀있으나 펼쳐지나 똑같아 보입니다.',
    reviewers: MOCK_REVIEWERS,
  },
  {
    title: '긴 답변이 있는 질문입니다. (테스트용)',
    content:
      '이 답변은 매우 길어서 기본 상태에서는 한 줄만 보이고 말줄임표(...)로 끝납니다. 우측의 화살표를 클릭하면 답변 전체가 펼쳐지면서 모든 텍스트를 확인할 수 있습니다. 다시 클릭하면 원래대로 접힙니다. CSS의 line-clamp 속성을 사용하여 구현되었습니다.',
    reviewers: [],
  },
  {
    title: '평가자가 없는 질문입니다.',
    content: '평가자 칩이 없을 때 레이아웃이 깨지지 않는지 확인합니다.',
  },
  {
    title: 'React Node 컨텐츠 테스트',
    content: (
      <div>
        <span style={{ color: 'red', fontWeight: 'bold' }}>컴포넌트 형태</span>
        의 답변도 들어갈 수 있습니다. 다만 line-clamp는 텍스트 위주로 동작하므로
        복잡한 구조에서는 동작이 다를 수 있습니다. 텍스트가 아주 길다면
        마찬가지로 잘립니다.
      </div>
    ),
    reviewers: MOCK_REVIEWERS,
  },
];

const meta: Meta<typeof ExpandableList> = {
  title: 'Components/List/ExpandableList', // 프로젝트 구조에 맞게 경로 수정
  component: ExpandableList,
  tags: ['autodocs'],
  argTypes: {
    width: {
      control: 'text',
      description: '리스트 전체의 너비',
    },
    isNumbering: {
      control: 'boolean',
      description: '질문 앞 번호 표시 여부',
    },
    readOnly: {
      control: 'boolean',
      description: '읽기 전용 모드 (펼치기 불가, 스타일 변경)',
    },
  },
  parameters: {
    componentSubtitle:
      '기본적으로 답변이 노출되지만, 1줄을 초과하면 말줄임표로 표시되고 클릭 시 확장되는 리스트입니다.1줄을 초과하면 말줄임표로 표시되고 클릭 시 확장되는 리스트입니다.1줄을 초과하면 말줄임표로 표시되고 클릭 시 확장되는 리스트입니다.1줄을 초과하면 말줄임표로 표시되고 클릭 시 확장되는 리스트입니다.1줄을 초과하면 말줄임표로 표시되고 클릭 시 확장되는 리스트입니다.',
  },
};

export default meta;

type Story = StoryObj<typeof ExpandableList>;

export const Default: Story = {
  args: {
    items: MOCK_ITEMS,
    isNumbering: true,
  },
};

export const ReadOnly: Story = {
  args: {
    items: MOCK_ITEMS,
    readOnly: true,
    isNumbering: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'readOnly가 true일 경우 배경색이 회색조로 변하고, 화살표가 사라지며 클릭해도 펼쳐지지 않습니다.',
      },
    },
  },
};

export const WithoutNumbering: Story = {
  args: {
    items: MOCK_ITEMS,
    isNumbering: false,
  },
};

export const CustomWidth: Story = {
  args: {
    items: MOCK_ITEMS,
    width: '500px',
  },
};
