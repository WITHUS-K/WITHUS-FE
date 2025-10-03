'use client';
import { Modal } from '@repo/ui/Modal';
import { useRouter } from 'next/navigation';
import ClubAddContent, {
  Org,
} from '../../_components/ClubAddModal/ClubAddContent';
import { useState } from 'react';

export default function ClubAddModal() {
  const router = useRouter();
  const close = () => router.back();
  const [selectedOrg, setSelectedOrg] = useState<Org | null>(null);
  const handleConfirm = async () => {
    if (!selectedOrg) return;
    // TODO: 동아리 추가
    close();
  };

  return (
    <Modal.Overlay open onClose={() => router.back()}>
      <Modal.Layout>
        <Modal.Header text="가입 동아리 추가" />
        <Modal.Content>
          <ClubAddContent onSelectChange={setSelectedOrg} />
        </Modal.Content>
        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="취소"
            confirmText="확인"
            cancelProps={{ onClick: close }}
            confirmProps={{
              onClick: handleConfirm,
              disabled: !selectedOrg, // 선택 없으면 비활성화
            }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
