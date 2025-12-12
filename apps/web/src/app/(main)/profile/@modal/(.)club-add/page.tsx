'use client';
import { Modal } from '@repo/ui/Modal';
import { useRouter } from 'next/navigation';
import ClubAddContent, {
  Org,
} from '../../_components/ClubAddModal/ClubAddContent';
import { useState } from 'react';
import { useProfileOrgDraftStore } from '@web/store/state/useProfileOrgDraftStore';

export default function ClubAddModal() {
  const router = useRouter();
  const close = () => router.back();
  const [selectedOrg, setSelectedOrg] = useState<Org | null>(null);

  const addOrg = useProfileOrgDraftStore((s) => s.add);
  const handleConfirm = async () => {
    if (!selectedOrg) return;
    addOrg({ id: selectedOrg.id, name: selectedOrg.name });
    close();
  };

  return (
    <Modal.Overlay open onClose={() => router.back()}>
      <Modal.Layout>
        <Modal.Header text="가입 동아리 추가" />
        <Modal.Content>
          <ClubAddContent onSelectChange={setSelectedOrg} />
        </Modal.Content>
        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="취소"
            confirmText="확인"
            cancelProps={{ onClick: close }}
            confirmProps={{
              onClick: handleConfirm,
              disabled: !selectedOrg, 
            }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
