'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@repo/ui/Modal';
import InviteContent from '../../_components/InviteModal/InviteContent';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { INITIAL_SELECTED } from '@web/constants/organization';
import { User } from '@web/types/organization';
import InviteHeader from '../../_components/InviteModal/InviteHeader';
import { useToast } from '@repo/ui/hooks';
import { useUserByEmailQuery } from '@web/store/query/useUserByEmailQuery';
import { useInviteUsersMutation } from '@web/store/mutation/useInviteUsersMutation';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

export default function InviteModal() {
  const router = useRouter();
  const close = () => router.back();

  // 상태: 검색어 & 선택된 유저 목록
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<User[]>([]);
  const toast = useToast();

  // 이메일로 유저 조회
  const { data, refetch, isFetching } = useUserByEmailQuery(search, false);
  const { organizationId } = getClientSideTokens();
  const inviteMutation = useInviteUsersMutation(organizationId);

  // 검색어 변경 핸들러
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      const res = await refetch();
      if (res.data) {
        const u = res.data;
        const ui: User = {
          id: String(u.userId),
          name: u.name,
          email: u.email,
          profileUrl: u.imageUrl ?? '',
        };
        setSelected((prev) =>
          prev.some((x) => x.id === ui.id) ? prev : [...prev, ui]
        );
        setSearch('');
      } else {
        toast.error('해당 이메일의 사용자를 찾을 수 없습니다.', 3000);
      }
    }
  };

  // 선택 해제 핸들러
  const handleRemove = (id: string) => {
    setSelected((prev) => prev.filter((u) => u.id !== id));
  };

  // 초대코드 복사
  const handleCopyLink = () => {
    toast.success('초대코드가 복사되었습니다.', { variant: 'outline' });
    // 초대코드 복사 로직 추가하기
  };

  return (
    <>
      <Modal.Overlay open onClose={() => router.back()}>
        <Modal.Layout>
          <Modal.Header>
            <InviteHeader count={selected.length} onCopyLink={handleCopyLink} />
          </Modal.Header>
          <Modal.Content>
            <InviteContent
              search={search}
              onSearchChange={handleSearchChange}
              selected={selected}
              onRemove={handleRemove}
              onSearchKeyDown={handleSearchKeyDown}
            />
          </Modal.Content>
          <Modal.Footer hasTopBorder>
            <Modal.DoubleCTA
              cancelText="닫기"
              confirmText="초대 코드 전송"
              cancelProps={{ onClick: close }}
              confirmProps={{
                disabled: selected.length === 0,
                onClick: () => {
                  const userIds = selected.map((u) => Number(u.id));
                  inviteMutation.mutate(
                    { userIds },
                    {
                      onSuccess: () => {
                        toast.success('초대 코드 전송이 완료 되었습니다. ', {
                          variant: 'outline',
                        });
                        close();
                      },
                    }
                  );
                },
              }}
            />
          </Modal.Footer>
        </Modal.Layout>
      </Modal.Overlay>
    </>
  );
}
