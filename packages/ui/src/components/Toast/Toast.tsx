import React, {
  ForwardedRef,
  ForwardRefExoticComponent,
  ReactNode,
  forwardRef,
  useEffect,
  KeyboardEvent,
  useRef,
} from 'react';
import { motion, AnimatePresence, HTMLMotionProps } from 'motion/react';
import { mergeRefs } from '@repo/utils';
import { useTimer } from '../../hooks/useTimer';
import { Text } from '..';
import { ToastIcon } from './compounds/Icon/Icon';
import * as styles from './Toast.css';

export type ToastType = 'default' | 'success' | 'error';
export type ToastVariant = 'solid' | 'outline';

export type ToastProps = {
  /**
   * 토스트 타입
   * @default 'default'
   */
  toastType?: ToastType;
  /**
   * 왼쪽 추가 요소 (아이콘 등)
   */
  leftAddon?: ReactNode;
  /**
   * 토스트 지속 시간 (ms)
   * @default 2000
   */
  duration?: number;
  /**
   * 자식 요소 (메시지)
   */
  children?: ReactNode;
  /**
   * 토스트 열기 여부
   */
  open: boolean;
  /**
   * 토스트가 열릴 때 호출되는 콜백
   */
  onOpen?: VoidFunction;
  /**
   * 토스트가 닫힐 때 호출되는 콜백
   */
  onClose?: VoidFunction;
  /**
   * 토스트가 완전히 사라진 후 호출되는 콜백
   */
  onExited?: VoidFunction;

  variant?: ToastVariant;
} & Omit<HTMLMotionProps<'div'>, 'children'>;

const ToastComponent = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      toastType = 'default',
      leftAddon,
      duration = 2000,
      children,
      open,
      onOpen,
      onClose,
      onExited,
      style: toastStyle,
      variant = 'solid',
      ...restProps
    },
    ref
  ) => {
    // 타이머 훅
    const { startCurrentTimer, clearCurrentTimeout } = useTimer({
      onTimerEnd: onClose,
      timeoutSecond: duration,
    });

    // 로컬 포커스용 ref
    const toastRef = useRef<HTMLDivElement>(null);

    // open이 true로 바뀔 때마다 실행
    useEffect(() => {
      if (open) {
        onOpen?.();
        startCurrentTimer();
        toastRef.current?.focus();
      }
    }, [open, onOpen, startCurrentTimer]);

    // ESC 키 눌러서 닫기
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Escape') {
        onClose?.();
      }
    };

    const combinedRef = mergeRefs<HTMLDivElement>(
      ref,
      toastRef
    ) as React.Ref<HTMLDivElement>;

    return (
      <AnimatePresence onExitComplete={onExited}>
        {open && (
          <motion.div
            ref={combinedRef}
            className={`${styles.container} ${styles.variant[variant]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.2, ease: 'easeInOut' },
            }}
            onPointerEnter={clearCurrentTimeout}
            onPointerLeave={startCurrentTimer}
            style={toastStyle}
            role="alert"
            aria-live="polite"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            {...restProps}
          >
            <div className={styles.content}>
              {leftAddon ?? (
                <ToastIcon
                  toastType={toastType}
                  aria-hidden="true"
                  style={{ color: 'currentColor' }}
                />
              )}
              <Text
                variant="sm_caption_semibold"
                color={variant === 'solid' ? 'white' : 'primary50'}
              >
                {children}
              </Text>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);

type ToastComposition = {
  Icon: typeof ToastIcon;
};

export const Toast: ForwardRefExoticComponent<ToastProps> & ToastComposition =
  Object.assign(ToastComponent, {
    Icon: ToastIcon,
  });

Toast.displayName = 'Toast';
