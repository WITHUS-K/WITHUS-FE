import { Button, ButtonProps } from '@/components';

type DoubleCTAProps = {
  cancelProps?: Omit<ButtonProps, 'children'>;
  confirmProps?: Omit<ButtonProps, 'children'>;
  cancelText: string;
  confirmText: string;
};

export function DoubleCTA({
  cancelProps,
  confirmProps,
  cancelText,
  confirmText,
}: DoubleCTAProps) {
  return (
    <>
      <Button variant="basic" size="48" width="18.5rem" {...cancelProps}>
        {cancelText}
      </Button>
      <Button variant="main" size="48" width="18.5rem" {...confirmProps}>
        {confirmText}
      </Button>
    </>
  );
}
