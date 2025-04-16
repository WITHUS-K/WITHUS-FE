import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '.';
import { IcButtonEx } from '../../icons/src/mono';

const meta: Meta<typeof Button> = {
  title: 'Common/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

const VARIANTS = ['main', 'sub', 'basic', 'stroke', 'white'] as const;
const SIZES = ['32', '40', '48', '56', '64'] as const;

export const ButtonVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
      {VARIANTS.map((variant) => (
        <div key={variant}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>
            {variant}
          </h3>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
          >
            {SIZES.map((size) => (
              <div
                key={`${variant}-${size}`}
                style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
              >
                <Button
                  variant={variant}
                  size={size}
                  leftIcon={<IcButtonEx />}
                  width="14rem"
                >
                  {size}px
                </Button>
                <Button
                  variant={variant}
                  size={size}
                  leftIcon={<IcButtonEx />}
                  width="14rem"
                  disabled
                >
                  {size}px
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
