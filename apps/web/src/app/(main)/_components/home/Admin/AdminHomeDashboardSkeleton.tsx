import * as s from './AdminHomeDashboardSkeleton.css';

function Block({
  width = '100%',
  height = '1.6rem',
  borderRadius = '0.8rem',
}: {
  width?: string;
  height?: string;
  borderRadius?: string;
}) {
  return <div className={s.skeletonBlock} style={{ width, height, borderRadius }} />;
}

export function AdminHomeDashboardSkeleton() {
  return (
    <div className={s.wrapper}>
      {/* Header */}
      <div className={s.headerRow}>
        <Block width="4rem" height="2.8rem" />
        <Block width="14.6rem" height="4.8rem" borderRadius="1.2rem" />
      </div>

      <div className={s.col} style={{ gap: '2rem' }}>
        {/* AnnounceCard */}
        <div className={s.card}>
          <div className={s.row} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
            <Block width="26rem" height="2rem" />
            <Block width="16rem" height="2rem" />
          </div>
          <div className={s.row} style={{ marginTop: '2rem', gap: '3.2rem', alignItems: 'center' }}>
            <Block width="8rem" height="8rem" borderRadius="50%" />
            <div className={s.col} style={{ gap: '0.4rem', width: '9rem' }}>
              <Block width="6rem" height="1.4rem" />
              <Block width="9rem" height="2.8rem" />
            </div>
            <div className={s.dividerV} />
            <div className={s.row} style={{ gap: '2rem', flexGrow: 1 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className={s.partCard}>
                  <Block width="3rem" height="1.4rem" />
                  <Block width="8rem" height="2rem" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom 3 cards */}
        <div className={s.row} style={{ gap: '2rem' }}>
          {/* DocTimeline */}
          <div className={s.cardFixed}>
            <div className={s.row} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div className={s.row} style={{ gap: '0.8rem', width: 'auto' }}>
                <Block width="9rem" height="2rem" />
                <Block width="7rem" height="2rem" borderRadius="100px" />
              </div>
            </div>
            <div className={s.row} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Block width="8rem" height="1.8rem" />
              <div className={s.row} style={{ gap: '1.6rem', width: 'auto' }}>
                <Block width="2.4rem" height="2.4rem" borderRadius="50%" />
                <Block width="2.4rem" height="2.4rem" borderRadius="50%" />
              </div>
            </div>
            <div style={{ width: '100%', height: '1px', background: 'currentcolor', opacity: 0.08 }} />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={s.col} style={{ gap: '0.8rem', paddingLeft: '1.6rem' }}>
                <Block width="8rem" height="1.4rem" />
                <Block width="100%" height="4rem" borderRadius="12px" />
              </div>
            ))}
          </div>

          {/* OverallProgress */}
          <div className={s.cardFixed}>
            <div className={s.row} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Block width="14rem" height="2rem" />
              <div className={s.row} style={{ gap: '1.2rem', width: 'auto' }}>
                <Block width="4.9rem" height="3.2rem" />
                <Block width="4.9rem" height="3.2rem" />
              </div>
            </div>
            {[0, 1].map((i) => (
              <div key={i} style={{ padding: '1.2rem', background: 'rgba(0,0,0,0.03)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div className={s.row} style={{ gap: '1.2rem', alignItems: 'center' }}>
                  <Block width="4.4rem" height="4rem" />
                  <div className={s.col} style={{ gap: '0.4rem', flex: 1 }}>
                    <Block width="12rem" height="1.4rem" />
                    <Block width="10rem" height="1.4rem" />
                  </div>
                  <Block width="5rem" height="2rem" borderRadius="100px" />
                </div>
                <div style={{ background: 'white', padding: '1.2rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div className={s.row} style={{ justifyContent: 'space-between' }}>
                    <Block width="6rem" height="1.2rem" />
                    <Block width="4rem" height="1.2rem" />
                  </div>
                  <Block width="100%" height="0.8rem" borderRadius="100px" />
                </div>
              </div>
            ))}
          </div>

          {/* PendingUsers */}
          <div className={s.cardFixed}>
            <div className={s.row} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Block width="16rem" height="2rem" />
              <Block width="12.5rem" height="3.2rem" />
            </div>
            <div style={{ background: 'rgba(0,0,0,0.03)', borderRadius: '8px', padding: '0.6rem 0.8rem', display: 'flex', justifyContent: 'center' }}>
              <Block width="18rem" height="1.4rem" />
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={s.row} style={{ gap: '1.2rem', alignItems: 'center', padding: '0.8rem 0' }}>
                <Block width="3.2rem" height="3.2rem" borderRadius="50%" />
                <Block width="8rem" height="1.6rem" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
