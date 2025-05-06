'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@repo/ui/Modal';
import InviteContent from '../../_components/InviteModal/InviteContent';
import { ChangeEvent, useState } from 'react';
import { INITIAL_SELECTED } from '@web/constants/organization';
import { User } from '@web/types/organization';
import InviteHeader from '../../_components/InviteModal/InviteHeader';
import { Toast } from '@repo/ui/Toast';
import { useToast } from '@repo/ui/hooks';

export default function InviteModal() {
  const router = useRouter();
  const close = () => router.back();

  // 상태: 검색어 & 선택된 유저 목록
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<User[]>(INITIAL_SELECTED);
  const toast = useToast();

  // 검색어 변경 핸들러
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // 선택 해제 핸들러
  const handleRemove = (id: string) => {
    setSelected((prev) => prev.filter((u) => u.id !== id));
  };

  // 링크 복사
  const handleCopyLink = () => {
    toast.success('초대 링크가 복사되었습니다.', 3000);
    // 링크 복사 로직 추가
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
            />
          </Modal.Content>
          <Modal.Footer hasTopBorder>
            <Modal.DoubleCTA
              cancelText="닫기"
              confirmText="초대"
              cancelProps={{ onClick: close }}
              confirmProps={{
                onClick: () => {
                  // 초대 api
                  close();
                },
              }}
            />
          </Modal.Footer>
        </Modal.Layout>
      </Modal.Overlay>
    </>
  );
}
