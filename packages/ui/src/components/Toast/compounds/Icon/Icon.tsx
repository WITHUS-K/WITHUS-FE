import type { ToastType } from '../../Toast';
import { IcNotice, IcToastSuccess } from '../../../../icons/src/mono';

export interface ToastIconProps {
  /** 'default' | 'success' | 'error' */
  toastType: ToastType;
  /** 아이콘 크기(px) */
  size?: number;
  /** SVG에 전달할 기타 props */
  [key: string]: any;
}

export function ToastIcon({ toastType, size = 26, ...props }: ToastIconProps) {
  switch (toastType) {
    case 'success':
      return <IcToastSuccess width={size} height={size} {...props} />;
    case 'error':
      return <IcNotice width={size} height={size} {...props} />;
    default:
      return null;
  }
}
