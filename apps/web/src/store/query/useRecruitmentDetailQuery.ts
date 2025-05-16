'use client'
import { useQuery } from '@tanstack/react-query'
import { getRecruitmentDetailApi } from '@web/api/recruitment'
import type { RecruitmentDetailDto } from '@web/types/recruitment'

const STALE_TIME = 1000 * 60 * 2  
const GC_TIME    = 1000 * 60 * 3 

export const recruitmentDetailKey = (id: number) => ['recruitments', id] as const

export function useRecruitmentDetailQuery(
  recruitmentId: number
) {
  return useQuery<RecruitmentDetailDto, Error, RecruitmentDetailDto, ReturnType<typeof recruitmentDetailKey>>({
    queryKey: recruitmentDetailKey(recruitmentId),
    queryFn: () => getRecruitmentDetailApi(recruitmentId),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  })
}