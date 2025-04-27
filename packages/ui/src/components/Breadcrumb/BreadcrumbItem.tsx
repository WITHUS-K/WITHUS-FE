import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';
import { vars } from '@repo/theme';
import { Text } from '..';

export type BreadcrumbItemProps = {
  /** 표시할 텍스트 */
  children: ReactNode;
  /** 현재 페이지(마지막 아이템)이면 true */
  active?: boolean;
  /** 외부 Link 컴포넌트를 직접 쓰고 싶으면 true */
  asChild?: boolean;
} & ComponentPropsWithoutRef<'span'>;

import { Slot } from '@radix-ui/react-slot';
export const BreadcrumbItem = forwardRef<HTMLSpanElement, BreadcrumbItemProps>(
  (
    { children, active = false, asChild = false, className = '', ...props },
    ref
  ) => {
    const Component = asChild ? Slot : 'span';
    return (
      <Component ref={ref} {...props} className={className}>
        <Text
          variant="md2_text_medium"
          color={active ? 'grayscale90' : 'grayscale40'}
        >
          {children}
        </Text>
      </Component>
    );
  }
);
BreadcrumbItem.displayName = 'Breadcrumb.Item';
