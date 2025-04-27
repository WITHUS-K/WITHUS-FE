import {
  forwardRef,
  ComponentPropsWithoutRef,
  ReactNode,
  Children,
  isValidElement,
  Fragment,
} from 'react';
import { breadcrumbStyle } from './Breadcrumb.css';
import { vars } from '@repo/theme';
import { IcArrowRight } from '../../icons/src/mono';

export type BreadcrumbRootProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'nav'>;

export const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbRootProps>(
  ({ children, className = '', ...props }, ref) => {
    const items = Children.toArray(children).filter(isValidElement);

    return (
      <nav
        ref={ref}
        className={`${breadcrumbStyle} ${className}`}
        aria-label="breadcrumb"
        {...props}
      >
        {items.map((item, idx) => (
          <Fragment key={idx}>
            {item}
            {idx < items.length - 1 && (
              <IcArrowRight
                width={15}
                height={15}
                color={vars.colors.grayscale40}
                aria-hidden
              />
            )}
          </Fragment>
        ))}
      </nav>
    );
  }
);
BreadcrumbRoot.displayName = 'Breadcrumb';
