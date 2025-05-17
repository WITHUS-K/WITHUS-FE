'use client'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { GET } from '@web/api/fetch'
import { queryKeys } from '@web/store/constants/queryKeys'
import type {
  RecruitmentDto,
  RecruitmentsResponse,
} from '@web/types/recruitment'

const STALE_TIME = 1000 * 60 * 2   
const GC_TIME    = 1000 * 60 * 3   

export function useRecruitmentsQuery(keyword?: string) {
  const key = queryKeys.recruitments.list(keyword)

  return useQuery<RecruitmentDto[], Error, RecruitmentDto[], typeof key>({
    queryKey: key,               
    queryFn: async () => {       
      const res = await GET<RecruitmentsResponse['result']>(
        '/api/v1/recruitments',
        keyword ? { keyword } : undefined
      )
      return res.result
    },
    staleTime: STALE_TIME,       
    gcTime: GC_TIME,
    refetchOnMount: 'always',          
  })
}