export default function DocsEvalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: '2.4rem', width: '100%', height: '100%' }}>
      {children}
    </div>
  );
}
