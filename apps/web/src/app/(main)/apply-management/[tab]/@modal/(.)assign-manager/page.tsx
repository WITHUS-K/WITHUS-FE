'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@repo/ui/Modal';
import AssignModalContent, {
  AssignModalContentRef,
} from '../../../_components/AssignModalContent/AssignModalContent';
import { useRef } from 'react';

export default function AssignManagerModal() {
  const router = useRouter();
  const contentRef = useRef<AssignModalContentRef>(null);

  const close = () => router.back();

  return (
    <Modal.Overlay open onClose={close}>
      <Modal.Layout width="58.3rem">
        <Modal.Header text="담당자 분배" />

        <Modal.Content>
          <AssignModalContent ref={contentRef} />
        </Modal.Content>

        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="닫기"
            confirmText="확인"
            cancelProps={{ onClick: close }}
            confirmProps={{
              onClick: async () => {
                const success = await contentRef.current?.handleConfirm();
                if (success) {
                  close(); // 성공했을 때만 닫기
                }
              },
            }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
