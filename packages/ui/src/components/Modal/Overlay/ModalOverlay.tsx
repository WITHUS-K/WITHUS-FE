import * as styles from './ModalOverlay.css'; // 아래에 정의

export function ModalOverlay({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </>
  );
}
