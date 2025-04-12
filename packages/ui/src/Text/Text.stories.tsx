import type { Meta, StoryObj } from '@storybook/react';
import Text from './Text';
import { textVariants, textColors } from './Text.css';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  //tags: ['autodocs'],
  argTypes: {
    variant: { table: { disable: true } },
    color: { table: { disable: true } },
    children: { control: 'text' },
  },
  args: {
    children: '텍스트 예시',
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {Object.keys(textVariants).map((variant) => (
        <Text
          key={variant}
          variant={variant as keyof typeof textVariants}
          color="black"
        >
          {variant}
        </Text>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {Object.keys(textColors).map((color) => (
        <Text
          key={color}
          variant="md1_text_regular"
          color={color as keyof typeof textColors}
        >
          {color}
        </Text>
      ))}
    </div>
  ),
};
