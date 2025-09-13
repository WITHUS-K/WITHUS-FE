'use client';
import { useCallback } from 'react';
import { overlay } from 'overlay-kit';
import { Toast, ToastType } from '../components/Toast/Toast';
import type { ToastVariant } from '../components/Toast/Toast';

const DEFAULT_DURATION = 3000;

type ShowOpts =
  | number
  | {
      duration?: number;
      variant?: ToastVariant; // 'solid' | 'outline'
    };

function parseOpts(opts?: ShowOpts): {
  duration: number;
  variant: ToastVariant;
} {
  if (typeof opts === 'number') return { duration: opts, variant: 'solid' };
  return {
    duration: opts?.duration ?? DEFAULT_DURATION,
    variant: opts?.variant ?? 'solid',
  };
}

export function useToast() {
  const show = useCallback(
    (text: string, toastType: ToastType = 'default', opts?: ShowOpts) => {
      const { duration, variant } = parseOpts(opts);

      return overlay.open(({ isOpen, close, unmount }) => (
        <Toast
          open={isOpen}
          toastType={toastType}
          variant={variant}
          duration={duration}
          onClose={close}
          onExited={unmount}
          leftAddon={
            toastType !== 'default' ? (
              <Toast.Icon
                toastType={toastType}
                aria-hidden
                style={{ color: 'currentColor' }}
              />
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
    // 기본(solid)
    default: (text: string, opts?: ShowOpts) => show(text, 'default', opts),
    success: (text: string, opts?: ShowOpts) => show(text, 'success', opts),
    error: (text: string, opts?: ShowOpts) => show(text, 'error', opts),

    // outline
    defaultOutline: (text: string, duration = DEFAULT_DURATION) =>
      show(text, 'default', { duration, variant: 'outline' }),
    successOutline: (text: string, duration = DEFAULT_DURATION) =>
      show(text, 'success', { duration, variant: 'outline' }),
    errorOutline: (text: string, duration = DEFAULT_DURATION) =>
      show(text, 'error', { duration, variant: 'outline' }),
  } as const;
}
