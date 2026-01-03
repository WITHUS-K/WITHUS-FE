'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@repo/ui/Modal';
import InviteContent from '../../_components/InviteModal/InviteContent';
import { ChangeEvent, useState, KeyboardEvent, useMemo } from 'react';
import { INITIAL_SELECTED } from '@web/constants/organization';
import { User } from '@web/types/organization';
import InviteHeader from '../../_components/InviteModal/InviteHeader';
import { useToast } from '@repo/ui/hooks';
import { useUserByEmailQuery } from '@web/store/query/useUserByEmailQuery';
import { useInviteUsersMutation } from '@web/store/mutation/useInviteUsersMutation';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useOrganizationInviteCodeQuery } from '@web/store/query/useOrganizationInviteCodeQuery';

export default function InviteModal() {
  const router = useRouter();
  const close = () => router.back();

  // 상태: 검색어 & 선택된 유저 목록
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<User[]>([]);
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const [isSearched, setIsSearched] = useState(false);
  const [isLocalLoading, setIsLocalLoading] = useState(false);
  const toast = useToast();

  // 이메일로 유저 조회
  const { data, refetch, isFetching } = useUserByEmailQuery(search, false);
  const { organizationId } = getClientSideTokens();
  const inviteMutation = useInviteUsersMutation(organizationId);

  const { data: invite } = useOrganizationInviteCodeQuery(organizationId);
  const inviteCode = invite?.inviteCode ?? '';

  // 검색어 변경 핸들러
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setSearch(v);
    if (v === '') {
      setIsSearched(false);
      setSearchResult(null);
    }
  };

  const handleSearchKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim()) {
      setIsLocalLoading(true);
      setIsSearched(false);

      try {
        const res = await refetch();
        const currentSearchEmail = search.trim();

        if (res.data && res.data.userId) {
          setSearchResult({
            id: String(res.data.userId),
            name: res.data.name,
            email: res.data.email,
            profileUrl: res.data.imageUrl ?? '',
          });
        } else {
          setSearchResult({
            id: `temp-${currentSearchEmail}`,
            name: '',
            email: currentSearchEmail,
            profileUrl: '',
          });
        }
        setIsSearched(true);
      } finally {
        setIsLocalLoading(false);
      }
    }
  };

  const handleToggleUser = (user: User) => {
    setSelected((prev) => {
      const isAlreadySelected = prev.some((u) => u.email === user.email);
      if (isAlreadySelected) return prev.filter((u) => u.email !== user.email);
      return [...prev, user];
    });
  };

  // 선택 해제 핸들러
  const handleRemove = (id: string) => {
    setSelected((prev) => prev.filter((u) => u.id !== id));
  };

  // 초대코드 복사
  const handleCopyLink = async () => {
    if (!inviteCode) {
      toast.error(
        '초대코드를 불러오는 중입니다. 잠시 후 다시 시도해주세요.',
        2500
      );
      return;
    }
    try {
      await navigator.clipboard.writeText(inviteCode);
      toast.success('초대코드가 복사되었습니다.', { variant: 'outline' });
    } catch {
      const ta = document.createElement('textarea');
      ta.value = inviteCode;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      toast.success('초대코드가 복사되었습니다.', { variant: 'outline' });
    }
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
              searchResult={searchResult}
              onToggle={handleToggleUser}
              isSearching={search.length > 0}
              isLoading={isLocalLoading}
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
