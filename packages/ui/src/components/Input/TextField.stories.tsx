import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TextField from './TextField';

const meta: Meta<typeof TextField> = {
  title: 'Common/Input/TextField',
  component: TextField,
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Test: Story = {
  render: () => {
    const [basic, setBasic] = useState('');
    const [focus, setFocus] = useState('text');
    const [success, setSuccess] = useState('text');
    const [error, setError] = useState('text');
    const [password, setPassword] = useState('12345678');
    const [pwEmpty, setPwEmpty] = useState('');
    const [confirm1, setConfirm1] = useState('');
    const [confirm2, setConfirm2] = useState('text');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.6rem',
          width: '42rem',
        }}
      >
        <TextField
          title="Text"
          description="description"
          inputProps={{
            placeholder: 'text',
            value: basic,
            onChange: (e) => setBasic(e.target.value),
          }}
        />
        <TextField
          title="Text"
          description="description"
          success
          inputProps={{
            placeholder: 'text',
            value: focus,
            onChange: (e) => setFocus(e.target.value),
          }}
        />
        <TextField
          title="Text"
          success
          inputProps={{
            placeholder: 'text',
            value: success,
            onChange: (e) => setSuccess(e.target.value),
          }}
        />
        <TextField
          title="Text"
          errorMessage="Text"
          inputProps={{
            placeholder: 'text',
            value: error,
            onChange: (e) => setError(e.target.value),
          }}
        />
        <TextField
          title="Text"
          success
          inputProps={{
            placeholder: '••••••••',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            type: 'password',
          }}
        />
        <TextField
          title="Text"
          inputProps={{
            placeholder: 'text',
            value: pwEmpty,
            onChange: (e) => setPwEmpty(e.target.value),
            type: 'password',
          }}
        />
        <TextField
          title="Text"
          errorMessage="Text"
          inputProps={{
            placeholder: 'text',
            value: confirm1,
            onChange: (e) => setConfirm1(e.target.value),
            type: 'password',
          }}
        />
        <TextField
          title="Text"
          errorMessage="Text"
          inputProps={{
            placeholder: 'text',
            value: confirm2,
            onChange: (e) => setConfirm2(e.target.value),
          }}
        />
      </div>
    );
  },
};
