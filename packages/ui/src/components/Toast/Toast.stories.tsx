// src/components/Toast/Toast.stories.tsx

import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProps } from './Toast';

const meta: Meta<ToastProps> = {
  title: 'Common/Toast',
  component: Toast,
  parameters: {
    docs: {
      description: {
        component: '토스트 알림 컴포넌트 (페이드 인/아웃 모션)',
      },
    },
  },
  argTypes: {
    toastType: {
      control: { type: 'select' },
      options: ['default', 'success', 'error'] as const,
      description: "토스트 타입 (`'default' | 'success' | 'error'`)",
      defaultValue: 'default',
    },
    duration: {
      control: { type: 'number', min: 500, max: 10000, step: 500 },
      description: '토스트 지속 시간 (ms)',
      defaultValue: 2000,
    },
    children: {
      control: 'text',
      description: '토스트에 표시될 메시지',
      defaultValue: 'Hello, Toast!',
    },
    open: { table: { disable: true } },
    onOpen: { action: 'onOpen', description: '토스트 열릴 때 호출' },
    onClose: { action: 'onClose', description: '토스트 닫힐 때 호출' },
    onExited: {
      action: 'onExited',
      description: '토스트 완전히 사라진 후 호출',
    },
  },
};

export default meta;
type Story = StoryObj<ToastProps>;

const renderToast: Story['render'] = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  const show = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <button onClick={show}>Show Toast</button>
      <Toast
        {...args}
        open={isOpen}
        onOpen={args.onOpen}
        onClose={() => {
          close();
          args.onClose?.();
        }}
        onExited={() => {
          close();
          args.onExited?.();
        }}
      >
        {args.children}
      </Toast>
    </div>
  );
};

export const Default: Story = {
  render: renderToast,
  args: {
    toastType: 'default',
    duration: 2000,
    children: '기본 토스트 메시지',
  },
};

export const Success: Story = {
  render: renderToast,
  args: {
    toastType: 'success',
    duration: 2000,
    children: '성공 메시지입니다!',
  },
};

export const Error: Story = {
  render: renderToast,
  args: {
    toastType: 'error',
    duration: 2000,
    children: '오류가 발생했습니다.',
  },
};
