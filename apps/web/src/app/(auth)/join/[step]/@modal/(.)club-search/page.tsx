'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { Modal } from '@repo/ui/Modal';
import ClubSearchContent from '../../../_components/ClubSearchContent/ClubSearchContent';
import { useClub } from '../../../_context/ClubContext';

export default function ClubSearchModal() {
  const router = useRouter();
  const { setClub } = useClub();

  const close = () => router.back();
  const confirm = () => {
    close();
  };

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
            confirmProps={{ onClick: confirm }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
