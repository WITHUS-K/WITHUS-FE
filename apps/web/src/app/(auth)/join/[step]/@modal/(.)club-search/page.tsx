'use client';

import { useRouter } from 'next/navigation';
import { Modal } from '@repo/ui/Modal';
import ClubSearchContent from '../../../_components/ClubSearchContent/ClubSearchContent';

export default function ClubSearchModal() {
  const router = useRouter();
  const close = () => router.back();

  return (
    <Modal.Overlay open onClose={close}>
      <Modal.Layout>
        <Modal.Header text="동아리 검색" />
        <Modal.Content>
          <ClubSearchContent />
        </Modal.Content>
        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="닫기"
            confirmText="확인"
            cancelProps={{ onClick: close }}
            confirmProps={{ onClick: close }} // 추후 선택 값 전달로 확장
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
