'use client';
import { Modal } from '@repo/ui/Modal';
import { useRouter } from 'next/navigation';
import ClubAddContent from '../../_components/ClubAddModal/ClubAddContent';

export default function ClubAddModal() {
  const router = useRouter();
  const close = () => router.back();

  const handleClose = () => {
    close();
  };

  return (
    <Modal.Overlay open onClose={() => router.back()}>
      <Modal.Layout>
        <Modal.Header text="가입 동아리 추가" />
        <Modal.Content>
          <ClubAddContent />
        </Modal.Content>
        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="취소"
            confirmText="확인"
            cancelProps={{ onClick: close }}
            confirmProps={{
              onClick: () => {
                //동아리 추가 api
                handleClose();
              },
            }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
