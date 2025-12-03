'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Modal } from '@repo/ui/Modal';
import {
  ChargeModalContent,
  ChargeModalContentRef,
} from '@web/app/(main)/apply-management/_components/ChargeModalContent/ChargeModalContent';
import { useRef } from 'react';
import { useEvaluatorStore } from '@web/store/state/evaluatorStore';

export default function ChargeModal() {
  const router = useRouter();

  const clearSelectedEvaluators = useEvaluatorStore(
    (s) => s.clearSelectedEvaluators
  );
  const contentRef = useRef<ChargeModalContentRef>(null);

  const close = () => {
    clearSelectedEvaluators();
      router.back();
  };

  return (
    <Modal.Overlay open onClose={close}>
      <Modal.Layout>
        <Modal.Header text="평가 담당자 추가" />

        <Modal.Content>
          <ChargeModalContent ref={contentRef} onClose={close} />
        </Modal.Content>

        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="닫기"
            confirmText="확인"
            cancelProps={{ onClick: close }}
            confirmProps={{
              onClick: () => {
                contentRef.current?.handleConfirm();
              },
            }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
