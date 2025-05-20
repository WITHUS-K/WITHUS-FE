import { api } from './api';
import { reissueTokens } from './auth';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { ROUTES } from '@web/routes';
import { HTTPError } from 'ky';
import { notFound } from 'next/navigation';
import { ApiResponse, STATUS, Tokens } from './types';
import { clearClientSideTokens } from '@web/utils/clearTokens';

type FetchMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

type FetchOptions = {
  method: FetchMethod;
  json?: unknown;
  searchParams?: Record<string, string>;
};

async function fetchWrapperWithTokenHandler<Data>(
  uri: string,
  options?: FetchOptions,
  tokens?: Tokens,
  hasRetried = false
): Promise<ApiResponse<Data>> {
  const method = options?.method ?? 'get';

  console.log('토큰', tokens);

  // 클라이언트 사이드에서 토큰이 없으면 쿠키에서 읽어옴
  if (!tokens && typeof window !== 'undefined') {
    tokens = getClientSideTokens();
  }

  // 헤더에 토큰 포함 --> 원래 토큰이 있던 api 들만!!
  const headers = tokens?.accessToken
    ? { Authorization: `Bearer ${tokens.accessToken}` }
    : {};

  try {
    // 실제 API 호출
    const response = await api[method](uri, {
      json: options?.json,
      searchParams: options?.searchParams,
      headers,
    }).json<ApiResponse<Data>>();

    return response;
  } catch (error) {
    if (error instanceof HTTPError) {
      const status = error.response.status;

      // 인증 실패 시
      if (status === STATUS.UNAUTHORIZED && tokens?.accessToken) {
        if (!hasRetried) {
          // 첫 401 → 토큰 재발급 시도
          try {
            const newTokens = await reissueTokens(tokens);

            // 재발급된 토큰으로 동일 요청 재실행
            return await fetchWrapperWithTokenHandler<Data>(
              uri,
              options,
              newTokens,
              true
            );
          } catch {
            // 재발급 실패 시 토큰 클리어 후 로그인 페이지로
            clearClientSideTokens();
            if (typeof window !== 'undefined') {
              window.location.replace(ROUTES.LOGIN);
            }
            throw new Error('세션이 만료되었습니다. 다시 로그인해주세요.');
          }
        } else {
          // 두 번째 401 → 바로 로그인으로
          if (typeof window !== 'undefined') {
            window.location.replace(ROUTES.LOGIN);
          }
          throw new Error('로그인이 필요해요!');
        }
      }

      if (status === STATUS.FORBIDDEN) {
        window.location.replace(ROUTES.LOGIN);
      }

      // 리소스 없음
      if (status === STATUS.NOT_FOUND) {
        notFound();
      }
    }

    // 그 외 오류
    throw new Error(
      `API 요청 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`
    );
  }
}

/** POST 요청 */
export function POST<Data>(
  uri: string,
  body?: unknown,
  tokens?: Tokens
): Promise<ApiResponse<Data>> {
  return fetchWrapperWithTokenHandler<Data>(
    uri,
    { method: 'post', json: body },
    tokens
  );
}

/** GET 요청 */
export function GET<Data>(
  uri: string,
  params?: Record<string, string>,
  tokens?: Tokens
): Promise<ApiResponse<Data>> {
  return fetchWrapperWithTokenHandler<Data>(
    uri,
    { method: 'get', searchParams: params },
    tokens
  );
}

/** PUT 요청 */
export function PUT<Data>(
  uri: string,
  body?: unknown,
  tokens?: Tokens
): Promise<ApiResponse<Data>> {
  return fetchWrapperWithTokenHandler<Data>(
    uri,
    { method: 'put', json: body },
    tokens
  );
}

/** DELETE 요청 */
export function DELETE<Data>(
  uri: string,
  body?: unknown,
  tokens?: Tokens
): Promise<ApiResponse<Data>> {
  return fetchWrapperWithTokenHandler<Data>(
    uri,
    { method: 'delete', json: body },
    tokens
  );
}

/** PATCH 요청 */
export function PATCH<Data>(
  uri: string,
  body?: unknown,
  tokens?: Tokens
): Promise<ApiResponse<Data>> {
  return fetchWrapperWithTokenHandler<Data>(
    uri,
    { method: 'patch', json: body },
    tokens
  );
}
