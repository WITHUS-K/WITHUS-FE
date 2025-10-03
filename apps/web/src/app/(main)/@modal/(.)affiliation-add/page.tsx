'use client';
import { Modal } from '@repo/ui/Modal';
import { useRouter } from 'next/navigation';
import AffiliationContent, {
  Org,
} from '../../_components/AffiliationModal/AffiliationContent';
import { useState } from 'react';

export default function PartModal() {
  const router = useRouter();
  const close = () => router.back();

  const [selectedOrg, setSelectedOrg] = useState<Org | null>(null);

  const handleConfirm = () => {
    if (!selectedOrg) return;
    // TODO: API 호출
    close();
  };

  return (
    <Modal.Overlay open onClose={() => router.back()}>
      <Modal.Layout>
        <Modal.Header text="소속 추가" />
        <Modal.Content>
          <AffiliationContent onSelectChange={setSelectedOrg} />
        </Modal.Content>
        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="닫기"
            confirmText="확인"
            cancelProps={{ onClick: close }}
            confirmProps={{
              onClick: handleConfirm,
              disabled: !selectedOrg,
            }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
