import * as s from './PendingUsersSkeleton.css';

function Block({ width = '100%', height = '1.6rem', borderRadius = '0.8rem' }: { width?: string; height?: string; borderRadius?: string }) {
  return <div className={s.skeletonBlock} style={{ width, height, borderRadius }} />;
}

export function PendingUsersSkeleton() {
  return (
    <section className={s.root}>
      <div className={s.header}>
        <Block width="16rem" height="2rem" />
        <Block width="12.5rem" height="3.2rem" />
      </div>

      <div className={s.subheaderBar}>
        <Block width="18rem" height="1.4rem" />
      </div>

      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={s.userItem}>
          <Block width="3.2rem" height="3.2rem" borderRadius="50%" />
          <Block width="8rem" height="1.6rem" />
        </div>
      ))}
    </section>
  );
}
