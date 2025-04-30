import { BreadcrumbRoot } from './BreadcrumbRoot';
import { BreadcrumbItem } from './BreadcrumbItem';

export const Breadcrumb = Object.assign(BreadcrumbRoot, {
  Item: BreadcrumbItem,
});

export type { BreadcrumbRootProps } from './BreadcrumbRoot';
export type { BreadcrumbItemProps } from './BreadcrumbItem';
