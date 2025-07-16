'use client';

import { useCallback } from 'react';
import { overlay } from 'overlay-kit';
import { Modal } from '../components/Modal/Modal';
import { IcLogout, IcModalCheck, IcModalWarning } from '../icons/src/colored';
type Controls = {
  close: () => void;
  unmount: () => void;
};

type ConfirmType = 'info' | 'warning' | 'logout';

export type ConfirmOpts = {
  type?: ConfirmType;
  title?: string;
  description?: string;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  hideCancel?: boolean;
};

const useModal = () => {
  const openBase = useCallback(
    (opts: {
      header?: React.ReactNode;
      content: (ctrl: Controls) => React.ReactNode;
      footer: (ctrl: Controls) => React.ReactNode;
    }) => {
      overlay.open(({ isOpen, close, unmount }) => (
        <Modal.Overlay
          open={isOpen}
          onClose={() => {
            close();
            unmount();
          }}
        >
          <Modal.Layout>
            {opts.header}
            {opts.content({ close, unmount })}
            {opts.footer({ close, unmount })}
          </Modal.Layout>
        </Modal.Overlay>
      ));
    },
    []
  );

  const confirm = useCallback(
    (opts: ConfirmOpts) => {
      const icon =
        opts.type === 'warning' ? (
          <IcModalWarning width={36} height={36} />
        ) : opts.type === 'info' ? (
          <IcModalCheck width={36} height={36} />
        ) : (
          <IcLogout width={36} height={36} />
        );

      openBase({
        content: ({ close, unmount }) => (
          <Modal.Content>
            <Modal.ModalTextContent
              icon={icon}
              title={opts.title}
              description={opts.description!}
            />
          </Modal.Content>
        ),
        footer: ({ close, unmount }) => {
          if (opts.hideCancel) {
            return (
              <Modal.Footer hasTopBorder={false}>
                <Modal.CTA
                  text={opts.confirmText ?? '확인'}
                  onClick={() => {
                    opts.onConfirm?.();
                    close();
                    unmount();
                  }}
                />
              </Modal.Footer>
            );
          } else {
            return (
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
            );
          }
        },
      });
    },
    [openBase]
  );

  const agreement = useCallback(
    (opts: {
      content: React.ReactNode;
      confirmText?: string;
      onConfirm?: () => void;
    }) => {
      openBase({
        header: <Modal.Header text="이용약관" />,
        content: () => <Modal.Content>{opts.content}</Modal.Content>,
        footer: ({ close, unmount }) => (
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
        ),
      });
    },
    [openBase]
  );

  return { confirm, agreement };
};

export { useModal };
