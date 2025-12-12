'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Modal } from '@repo/ui/Modal';
import { useRecipientsStore } from '@web/store/state/useRecipientsStore';
import InviteHeader from '../../../_components/InviteModal/InviteHeader';
import InviteRecipientsModalContent from '../../../_components/InviteModal/InviteRecipientsModalContent';

export default function InviteRecipientsModal() {
  const router = useRouter();
  const close = () => router.back();

  const { recipients } = useRecipientsStore();

  return (
    <Modal.Overlay open onClose={close}>
      <Modal.Layout width="78rem">
        <Modal.Header>
          <InviteHeader count={recipients.length} />
        </Modal.Header>

        <Modal.Content>
          <InviteRecipientsModalContent />
        </Modal.Content>

        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="닫기"
            confirmText="추가"
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
