import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TextToggleSwitch, TextToggleSwitchProps } from './TextToggleSwitch';

type Props = TextToggleSwitchProps<string>;

const meta: Meta<Props> = {
  title: 'Common/ToggleSwitch/TextToggleSwitch',
  component: TextToggleSwitch,
  argTypes: {
    onChange: { table: { disable: true } },
    className: { table: { disable: true } },
    options: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<Props>;

export const TwoOptions: Story = {
  args: {
    options: [
      { value: 'longText', label: '장문형' },
      { value: 'fileUpload', label: '파일 업로드' },
    ],
    selected: 'longText',
  },
  render: (args) => {
    const [selected, setSelected] = React.useState(args.selected);
    const handleChange = (value: string) => {
      action('onChange')(value);
      setSelected(value);
    };
    return (
      <TextToggleSwitch {...args} selected={selected} onChange={handleChange} />
    );
  },
};

export const ThreeOptions: Story = {
  args: {
    options: [
      { value: 'score', label: '점수제 평가' },
      { value: '3-level', label: '3단계 평가' },
      { value: '5-level', label: '5단계 평가' },
    ],
    selected: '3-level',
  },
  render: (args) => {
    const [selected, setSelected] = React.useState(args.selected);
    const handleChange = (value: string) => {
      action('onChange')(value);
      setSelected(value);
    };
    return (
      <TextToggleSwitch {...args} selected={selected} onChange={handleChange} />
    );
  },
};

export const FourOptions: Story = {
  args: {
    options: [
      { value: '10min', label: '10분' },
      { value: '15min', label: '15분' },
      { value: '30min', label: '30분' },
      { value: '1hr', label: '1시간' },
    ],
    selected: '30min',
  },
  render: (args) => {
    const [selected, setSelected] = React.useState(args.selected);
    const handleChange = (value: string) => {
      action('onChange')(value);
      setSelected(value);
    };
    return (
      <TextToggleSwitch {...args} selected={selected} onChange={handleChange} />
    );
  },
};
