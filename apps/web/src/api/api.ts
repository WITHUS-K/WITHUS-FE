import ky from 'ky';

const TIMEOUT = 1000 * 30;

export const api = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: TIMEOUT,
});
