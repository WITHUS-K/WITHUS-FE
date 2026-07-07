import * as s from './OverallProgressSkeleton.css';

function Block({ width = '100%', height = '1.6rem' }: { width?: string; height?: string }) {
  return <div className={s.skeletonBlock} style={{ width, height }} />;
}

export function OverallProgressSkeleton() {
  return (
    <section className={s.root}>
      <div className={s.header}>
        <Block width="14rem" height="2rem" />
        <div className={s.tabGroup}>
          <Block width="4.9rem" height="3.2rem" />
          <Block width="4.9rem" height="3.2rem" />
        </div>
      </div>

      {[0, 1].map((i) => (
        <div key={i} className={s.progressCard}>
          <div className={s.cardRow}>
            <Block width="4.4rem" height="4rem" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
              <Block width="12rem" height="1.4rem" />
              <Block width="10rem" height="1.4rem" />
            </div>
            <Block width="5rem" height="2rem" />
          </div>
          <div className={s.progressInner}>
            <div className={s.progressInfoRow}>
              <Block width="6rem" height="1.2rem" />
              <Block width="4rem" height="1.2rem" />
            </div>
            <Block width="100%" height="0.8rem" />
          </div>
        </div>
      ))}
    </section>
  );
}
