'use client'
import { useQuery } from '@tanstack/react-query'
import { getRecruitmentBySlugApi } from '@web/api/recruitment'
import type { RecruitmentDetailDto } from '@web/types/recruitment'
import { queryKeys } from '@web/store/constants/queryKeys'

const STALE_TIME = 1000 * 60 * 2  
const GC_TIME    = 1000 * 60 * 3  

export function useRecruitmentBySlugQuery(
  slug: string
) {
  const key = queryKeys.recruitments.slug(slug)

  return useQuery<RecruitmentDetailDto, Error, RecruitmentDetailDto, typeof key>({
    queryKey: key,
    queryFn: () => getRecruitmentBySlugApi(slug),
    staleTime: STALE_TIME,
    gcTime:    GC_TIME,
  })
}