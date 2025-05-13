'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@repo/ui/Modal';

export default function ChargeModal() {
  const router = useRouter();
  const close = () => router.back();

  return (
    <Modal.Overlay open onClose={close}>
      <Modal.Layout>
        <Modal.Header text="평가 담당자 추가" />

        <Modal.Content>
          <></>
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
