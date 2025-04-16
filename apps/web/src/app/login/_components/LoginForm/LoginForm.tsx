'use client';

import { useState } from 'react';
import { TextField } from '@repo/ui/TextField';
import { Button } from '@repo/ui/Button';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isValid = email !== '' && password !== '';

  return (
    <form style={{ width: '42rem' }}>
      <div style={{ flexDirection: 'column', gap: '1.2rem', width: '42rem' }}>
        <TextField
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorMessage={error.includes('이메일') ? error : ''}
          width="42rem"
          size="auth"
        />
        <TextField
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorMessage={error.includes('비밀번호') ? error : ''}
          width="42rem"
          size="auth"
        />
        <Button
          type="submit"
          variant="main"
          disabled={!isValid}
          style={{ marginTop: '1.2rem' }}
          size="64"
          width="42rem"
        >
          로그인하기
        </Button>
      </div>
    </form>
  );
}
