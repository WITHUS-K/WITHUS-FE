'use client';

import { useCallback } from 'react';
import { overlay } from 'overlay-kit';
import { Modal } from '../components/Modal/Modal';

type AlertProps = {
  title: string;
  description?: string;
  buttonText?: string;
  onConfirm?: () => void;
};

type ConfirmProps = {
  title: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

type AgreementProps = {
  content: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
};

export function useModal() {
  /** 알림 모달 */
  const alert = useCallback((opts: AlertProps) => {
    overlay.open(({ isOpen, close, unmount }) => (
      <Modal.Overlay
        open={isOpen}
        onClose={() => {
          close();
          unmount();
        }}
      >
        <Modal.Layout>
          <Modal.Content>
            <Modal.ModalTextContent
              title={opts.title}
              description={opts.description}
            />
          </Modal.Content>
          <Modal.Footer hasTopBorder={false}>
            <Modal.CTA
              text={opts.buttonText ?? '확인'}
              onClick={() => {
                opts.onConfirm?.();
                close();
                unmount();
              }}
            />
          </Modal.Footer>
        </Modal.Layout>
      </Modal.Overlay>
    ));
  }, []);

  /** 확인/취소 모달 */
  const confirm = useCallback((opts: ConfirmProps) => {
    overlay.open(({ isOpen, close, unmount }) => (
      <Modal.Overlay
        open={isOpen}
        onClose={() => {
          close();
          unmount();
        }}
      >
        <Modal.Layout>
          <Modal.Content>
            <Modal.ModalTextContent
              title={opts.title}
              description={opts.description}
            />
          </Modal.Content>
          <Modal.Footer hasTopBorder={false}>
            <Modal.DoubleCTA
              cancelText={opts.cancelText ?? '취소'}
              confirmText={opts.confirmText ?? '확인'}
              cancelProps={{
                onClick: () => {
                  opts.onCancel?.();
                  close();
                  unmount();
                },
              }}
              confirmProps={{
                onClick: () => {
                  opts.onConfirm?.();
                  close();
                  unmount();
                },
              }}
            />
          </Modal.Footer>
        </Modal.Layout>
      </Modal.Overlay>
    ));
  }, []);

  /** 이용약관 모달 */
  const agreement = useCallback((opts: AgreementProps) => {
    overlay.open(({ isOpen, close, unmount }) => (
      <Modal.Overlay
        open={isOpen}
        onClose={() => {
          close();
          unmount();
        }}
      >
        <Modal.Layout>
          <Modal.Header text="이용약관" />
          <Modal.Content>{opts.content}</Modal.Content>
          <Modal.Footer hasTopBorder>
            <Modal.CTA
              text={opts.confirmText ?? '확인'}
              onClick={() => {
                opts.onConfirm?.();
                close();
                unmount();
              }}
            />
          </Modal.Footer>
        </Modal.Layout>
      </Modal.Overlay>
    ));
  }, []);

  return { alert, confirm, agreement };
}
