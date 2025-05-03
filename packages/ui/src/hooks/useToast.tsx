'use client';

import { useCallback } from 'react';
import { overlay } from 'overlay-kit';
import { Toast } from '../components/Toast/Toast';
import type { ToastType } from '../components/Toast/Toast';

const DEFAULT_DURATION = 3000;

export function useToast() {
  const show = useCallback(
    (
      text: string,
      toastType: ToastType = 'default',
      duration: number = DEFAULT_DURATION
    ) => {
      return overlay.open(({ isOpen, close, unmount }) => (
        <Toast
          open={isOpen}
          toastType={toastType}
          duration={duration}
          onClose={close}
          onExited={unmount}
          leftAddon={
            toastType !== 'default' ? (
              <Toast.Icon toastType={toastType} aria-hidden />
            ) : undefined
          }
        >
          {text}
        </Toast>
      ));
    },
    []
  );

  return {
    default: (text: string, duration?: number) =>
      show(text, 'default', duration),

    success: (text: string, duration?: number) =>
      show(text, 'success', duration),

    error: (text: string, duration?: number) => show(text, 'error', duration),
  } as const;
}
