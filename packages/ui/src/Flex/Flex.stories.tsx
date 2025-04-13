import type { Meta, StoryObj } from '@storybook/react';
import Flex from './Flex';

const meta: Meta<typeof Flex> = {
  title: 'Common/Flex',
  component: Flex,
  //tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['row', 'column'],
    },
    align: {
      control: 'select',
      options: ['flexStart', 'flexEnd', 'center', 'stretch', 'baseline'],
    },
    justify: {
      control: 'select',
      options: [
        'flexStart',
        'flexEnd',
        'center',
        'spaceBetween',
        'spaceAround',
        'spaceEvenly',
      ],
    },
    wrap: {
      control: 'select',
      options: ['nowrap', 'wrap', 'wrapReverse'],
    },
    grow: {
      control: 'select',
      options: ['grow0', 'grow1'],
    },
    position: {
      control: 'select',
      options: ['static', 'absolute', 'relative', 'fixed', 'sticky'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Default: Story = {
  args: {
    direction: 'row',
    align: 'center',
    justify: 'center',
    gap: '1rem',
    padding: '1rem',
    style: { backgroundColor: '#f0f0f0' },
    children: (
      <>
        <div style={{ background: '#007bff', color: '#fff', padding: '1rem' }}>
          Item 1
        </div>
        <div style={{ background: '#28a745', color: '#fff', padding: '1rem' }}>
          Item 2
        </div>
        <div style={{ background: '#ffc107', color: '#fff', padding: '1rem' }}>
          Item 3
        </div>
      </>
    ),
  },
};

export const ColumnDirection: Story = {
  args: {
    direction: 'column',
    align: 'center',
    justify: 'center',
    gap: '1rem',
    padding: '1rem',
    style: { backgroundColor: '#e8f4fc', height: '30rem' },
    children: (
      <>
        <div style={{ background: '#20c997', color: '#fff', padding: '1rem' }}>
          Column 1
        </div>
        <div style={{ background: '#17a2b8', color: '#fff', padding: '1rem' }}>
          Column 2
        </div>
      </>
    ),
  },
};

export const WrapExample: Story = {
  args: {
    wrap: 'wrap',
    gap: '0.5rem',
    width: '30rem',
    padding: '1rem',
    style: { backgroundColor: '#fce4ec' },
    children: Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        style={{
          width: '8rem',
          height: '4rem',
          background: '#d81b60',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Box {i + 1}
      </div>
    )),
  },
};

export const GrowExample: Story = {
  args: {
    grow: 'grow1',
    direction: 'row',
    justify: 'spaceBetween',
    gap: '1rem',
    padding: '1rem',
    style: { backgroundColor: '#e3f2fd' },
    children: (
      <>
        <div style={{ background: '#1e88e5', color: '#fff', padding: '1rem' }}>
          Left
        </div>
        <div
          style={{
            background: '#c2185b',
            color: '#fff',
            padding: '1rem',
            flexGrow: 1,
          }}
        >
          Grow
        </div>
        <div style={{ background: '#1e88e5', color: '#fff', padding: '1rem' }}>
          Right
        </div>
      </>
    ),
  },
};
