// 헤더에 토큰 필요없는 api 들 이거 사용하면 됨

import { api } from './api';
import { ApiResponse } from './types';

type PublicMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

type PublicOptions = {
  method: PublicMethod;
  body?: unknown;
  searchParams?: Record<string, string>;
};

async function fetchPublicWrapper<Data>(
  uri: string,
  options: PublicOptions = { method: 'get' }
): Promise<ApiResponse<Data>> {
  const { method, body, searchParams } = options;
  const requestInit: Record<string, unknown> = {
    headers: { 'Content-Type': 'application/json' },
  };

  if (body !== undefined) {
    // stringified plain text body → preflight 없이 전송
    requestInit.body = JSON.stringify(body);
  }

  if (searchParams) {
    requestInit.searchParams = searchParams;
  }

  const response = await api[method](uri, requestInit).json<
    ApiResponse<Data>
  >();
  return response;
}

/** 인증 없이 간단 POST 요청 */
export function POST_PUBLIC<Data>(
  uri: string,
  body?: unknown
): Promise<ApiResponse<Data>> {
  return fetchPublicWrapper<Data>(uri, { method: 'post', body });
}

/** 인증 없이 간단 GET 요청 */
export function GET_PUBLIC<Data>(
  uri: string,
  params?: Record<string, string>
): Promise<ApiResponse<Data>> {
  return fetchPublicWrapper<Data>(uri, { method: 'get', searchParams: params });
}

/** 인증 없이 간단 PUT 요청 */
export function PUT_PUBLIC<Data>(
  uri: string,
  body?: unknown
): Promise<ApiResponse<Data>> {
  return fetchPublicWrapper<Data>(uri, { method: 'put', body });
}

/** 인증 없이 간단 DELETE 요청 */
export function DELETE_PUBLIC<Data>(uri: string): Promise<ApiResponse<Data>> {
  return fetchPublicWrapper<Data>(uri, { method: 'delete' });
}

/** 인증 없이 간단 PATCH 요청 */
export function PATCH_PUBLIC<Data>(
  uri: string,
  body?: unknown
): Promise<ApiResponse<Data>> {
  return fetchPublicWrapper<Data>(uri, { method: 'patch', body });
}
