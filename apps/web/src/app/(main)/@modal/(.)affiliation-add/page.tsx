'use client';
import { Modal } from '@repo/ui/Modal';
import { useRouter } from 'next/navigation';
import AffiliationContent from '../../_components/AffiliationModal/AffiliationContent';

export default function PartModal() {
  const router = useRouter();
  const close = () => router.back();

  const handleClose = () => {
    close();
  };

  return (
    <Modal.Overlay open onClose={() => router.back()}>
      <Modal.Layout>
        <Modal.Header text="소속 추가" />
        <Modal.Content>
          <AffiliationContent />
        </Modal.Content>
        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="닫기"
            confirmText="확인"
            cancelProps={{ onClick: close }}
            confirmProps={{
              onClick: () => {
                handleClose();
              },
            }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
