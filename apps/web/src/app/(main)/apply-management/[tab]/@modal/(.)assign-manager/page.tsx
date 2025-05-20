'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@repo/ui/Modal';
import AssignModalContent from '../../../_components/AssignModalContent/AssignModalContent';

export default function AssignManagerModal() {
  const router = useRouter();
  const close = () => router.back();

  return (
    <Modal.Overlay open onClose={close}>
      <Modal.Layout width="58.3rem">
        <Modal.Header text="담당자 분배" />

        <Modal.Content>
          <AssignModalContent />
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
