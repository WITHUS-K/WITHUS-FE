import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PATCH } from '@web/api/fetch';
import { useRouter } from 'next/navigation';

export type AdminApplicationStage =
  | 'DOCUMENT'
  | 'INTERVIEW'
  | 'FINAL_PASS'
  | 'FAIL';
export type UpdateStatusSimple = 'PASS' | 'FAIL' | 'HOLD';

export interface UpdateApplicationsStatusRequest {
  applicationIds: number[];
  stage: AdminApplicationStage;
  status: UpdateStatusSimple;
}

export interface UpdateApplicationsStatusResponse {
  code: number;
  message: string;
  result: {
    id: number;
    name: string;
    email: string;
    organizationRoleName : string;
    appliedPositions?: string[];
    status: string;
  }[];
  success: boolean;
}

export function useUpdateApplicationsStatus(
  recruitmentId: number,
  stage: AdminApplicationStage
) {
  const qc = useQueryClient();
  const router = useRouter();
  const listPrefix = [
    'admin',
    'applications',
    'recruitment',
    recruitmentId,
    'list',
    stage,
  ] as const;

  const allAppsPrefix = [
    'admin',
    'applications',
    'recruitment',
    recruitmentId,
    'list',
  ] as const;

  return useMutation<
    UpdateApplicationsStatusResponse,
    Error,
    UpdateApplicationsStatusRequest
  >({
    mutationFn: async (
      payload: UpdateApplicationsStatusRequest
    ): Promise<UpdateApplicationsStatusResponse> => {
      const res = await PATCH<UpdateApplicationsStatusResponse>(
        'api/v1/admin/applications/status',
        payload
      );
      return res.result;
    },

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: allAppsPrefix });
      qc.invalidateQueries({ queryKey: listPrefix });
    },
  });
}
