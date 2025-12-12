'use client';
import { Modal } from '@repo/ui/Modal';
import { useRouter } from 'next/navigation';
import AffiliationContent, {
  Org, SelectedInvite,
} from '../../_components/AffiliationModal/AffiliationContent';
import { useState } from 'react';
import { useAcceptOrganizationInviteMutation } from '@web/store/mutation/useAcceptOrganizationInviteMutation';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

export default function PartModal() {
  const router = useRouter();
  const close = () => router.back();

  const [selected, setSelected] = useState<SelectedInvite | null>(null);

  const tokens = getClientSideTokens(); 
  const { mutateAsync, isPending } =
    useAcceptOrganizationInviteMutation();

  const handleConfirm = async () => {
    if (!selected) return;

    await mutateAsync({ code: selected.code });
    router.refresh();
    close();
  };
  return (
    <Modal.Overlay open onClose={() => router.back()}>
      <Modal.Layout>
        <Modal.Header text="소속 추가" />
        <Modal.Content>
        <AffiliationContent onSelectChange={setSelected} />
        </Modal.Content>
        <Modal.Footer hasTopBorder>
          <Modal.DoubleCTA
            cancelText="닫기"
            confirmText="확인"
            cancelProps={{ onClick: close }}
            confirmProps={{
              onClick: handleConfirm,
              disabled: !selected || isPending,
            }}
          />
        </Modal.Footer>
      </Modal.Layout>
    </Modal.Overlay>
  );
}
