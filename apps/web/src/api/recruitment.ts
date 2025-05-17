import { DELETE, GET, POST, PUT } from '@web/api/fetch'
import type {
    DeleteRecruitmentResponse,
  DraftRecruitmentRequest,
  DraftRecruitmentResult,
  PublishRecruitmentRequest,
  PublishRecruitmentResult,
  RecruitmentDetailDto,
  RecruitmentDetailResponse,
  UpdateRecruitmentRequest,
} from '@web/types/recruitment'

/**
 * 리크루팅 조회
 */
export const getRecruitmentDetailApi = (
  recruitmentId: number
): Promise<RecruitmentDetailDto> =>
  GET<RecruitmentDetailResponse['result']>(`api/v1/recruitments/${recruitmentId}`).then(res => res.result);

/**
 * 리크루팅 수정
 */
export const updateRecruitmentApi = (
  recruitmentId: number,
  body: UpdateRecruitmentRequest
): Promise<RecruitmentDetailDto> =>
  PUT<RecruitmentDetailResponse['result']>(`api/v1/recruitments/${recruitmentId}`, body).then(res => res.result);

/**
 * 리크루팅 삭제
 */
export const deleteRecruitmentApi = (
  recruitmentId: number
): Promise<boolean> =>
  DELETE<DeleteRecruitmentResponse>(`api/v1/recruitments/${recruitmentId}`).then(res => res.success);

/**
 * 리크루팅 최종 저장 (Publish)
 */
export async function publishRecruitmentApi(
  body: PublishRecruitmentRequest
): Promise<PublishRecruitmentResult> {
  const { result } = await POST<PublishRecruitmentResult>(
    'api/v1/recruitments/publish',
    body
  )
  return result
}

/**
 * 리크루팅 임시저장 (Draft)
 */
export async function draftRecruitmentApi(
  body: DraftRecruitmentRequest
): Promise<DraftRecruitmentResult> {
  const { result } = await POST<DraftRecruitmentResult>(
    'api/v1/recruitments/draft',
    body
  )
  return result
}

export async function getRecruitmentBySlugApi(
  slug: string
): Promise<RecruitmentDetailDto> {
  const res = await GET<RecruitmentDetailResponse['result']>(
    `api/v1/recruitments/slug/${slug}`,
  )
  return res.result
}