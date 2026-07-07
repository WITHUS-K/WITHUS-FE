'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { getPendingEvaluatorsQueryOptions } from '@web/store/query/usePendingEvaluatorsQuery';
import { useRemindEvaluatorsMutation } from '@web/store/mutation/useRemindEvaluatorsMutation';
import { PendingUsers } from './PendingUsers';

interface Props {
  recruitmentId: number;
}

export function PendingUsersContainer({ recruitmentId }: Props) {
  const { data } = useSuspenseQuery(
    getPendingEvaluatorsQueryOptions(recruitmentId)
  );
  const { mutate: remind, isPending: isReminding } = useRemindEvaluatorsMutation();

  return (
    <PendingUsers
      data={data}
      onRemind={() => remind(recruitmentId)}
      isReminding={isReminding}
    />
  );
}
