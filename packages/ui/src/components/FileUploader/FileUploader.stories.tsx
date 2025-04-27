import type { Meta, StoryObj } from '@storybook/react';
import { FileUploader, FileInfo } from './FileUploader';

const meta: Meta<typeof FileUploader> = {
  title: 'Common/FileUploader',
  component: FileUploader,
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
  args: {
    file: {
      name: 'Portfolio.pdf',
      size: '5 MB',
      downloadUrl: 'https://example.com/Portfolio.pdf',
    } as FileInfo,
    onDownload: (file) => {
      console.log('다운로드 중...', file);
    },
  },
};
