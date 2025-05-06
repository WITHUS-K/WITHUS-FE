export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',

  // 회원가입
  JOIN: {
    BASE: '/join',
    STEP: (step: number, type?: 'user' | 'admin') => {
      const q = type ? `?type=${type}` : '';
      return `/join/${step}${q}`;
    },
  },

  // 비밀번호 찾기/재설정
  PASSWORD: {
    BASE: '/password',
    FIND: '/password/find',
    VERIFY: '/password/verify',
    RESET: '/password/reset',
    COMPLETE: '/password/complete',
  },

  ORGANIZATION: '/organization',
} as const;
