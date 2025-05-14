import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Memo } from './Memo';

const meta: Meta<typeof Memo> = {
  title: 'Common/Memo',
  component: Memo,
};

export default meta;
type Story = StoryObj<typeof Memo>;

export const Default: Story = {
  args: {
    author: '크리스탈',
    date: '2024.04.30',
    comment: '코멘트입니다~~ 코멘트입니다~~ 코멘트입니다~~ 코멘트입니다~~',
    isEditing: false,
    draft: '',
    onEditStart: action('onEditStart'),
    onDraftChange: action('onDraftChange'),
    onSubmit: action('onSubmit'),
  },
};

export const Editing: Story = {
  args: {
    author: '크리스탈',
    date: '2024.04.30',
    comment: '',
    isEditing: true,
    onEditStart: action('onEditStart'),
    onDraftChange: action('onDraftChange'),
    onSubmit: action('onSubmit'),
  },
};
