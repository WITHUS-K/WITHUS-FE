import { Breadcrumb } from '@repo/ui/Breadcrumb';

export default function ApplicationListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: '1.8rem 2.4rem' }}>
      <Breadcrumb style={{ marginBottom: '2.4rem' }}>
        <Breadcrumb.Item active>지원서 리스트</Breadcrumb.Item>
      </Breadcrumb>
      {children}
    </div>
  );
}
