'use client';
import { Modal } from '@repo/ui/Modal';
import { useRouter } from 'next/navigation';

export default function PartModal() {
  const router = useRouter();
  const close = () => router.back();


  return (
    <Modal.Overlay open onClose={() => router.back()}>
      <Modal.Layout width='55rem'>
        <Modal.Header text="소속 추가" />
        <Modal.Content>
       <div></div>
        </Modal.Content>
        <Modal.Footer hasTopBorder>
          <Modal.CTA
            text="확인"
            onClick={() => {
                close();
              }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
