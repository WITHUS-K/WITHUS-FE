'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@repo/ui/Modal';
import InviteModalContent from '@web/app/(main)/interview-management/_components/InviteModalContent/InviteModalContent';

export default function InviteModal() {
  const router = useRouter();
  const close = () => router.back();

  return (
    <Modal.Overlay open onClose={close}>
      <Modal.Layout>
        <Modal.Header text="면접관/안내자 추가" />

        <Modal.Content>
          <InviteModalContent />
        </Modal.Content>

        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="닫기"
            confirmText="확인"
            cancelProps={{ onClick: close }}
            confirmProps={{
              onClick: () => {
                close();
              },
            }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
