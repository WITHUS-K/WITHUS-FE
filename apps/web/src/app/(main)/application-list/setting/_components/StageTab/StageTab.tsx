'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import LeftPanel from './Left/LeftPanel';
import RightPanel from './Right/RightPanel';
import * as s from './StageTab.css';

gsap.registerPlugin(ScrollToPlugin);

type Pos = { top: number; left: number };

interface StageTabProps {
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function StageTab({ scrollContainerRef }: StageTabProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelPos, setPanelPos] = useState<Pos | null>(null);
  const [lastSec, setLastSec] = useState<string | null>(null);

  useEffect(() => {
    // “지원 마감”은 스크롤 예외
    if (lastSec === 'deadline') return;
    if (!panelPos || !panelRef.current || !scrollContainerRef?.current) return;

    const panelRect = panelRef.current.getBoundingClientRect();
    const containerRect = scrollContainerRef.current.getBoundingClientRect();
    const offsetY =
      panelRect.top -
      containerRect.top -
      containerRect.height / 2 +
      panelRect.height / 2;

    gsap.to(scrollContainerRef.current, {
      duration: 0.6,
      ease: 'power2.out',
      scrollTo: { y: scrollContainerRef.current.scrollTop + offsetY },
    });
  }, [panelPos, lastSec, scrollContainerRef]);

  const handleChipClick = (e: React.MouseEvent<HTMLElement>, sec: string) => {
    setLastSec(sec);

    const chipRect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const baseTop = chipRect.top - containerRect.top - 64;
    const baseLeft = chipRect.right - containerRect.left;
    const offsetX = sec.startsWith('interview-') ? 47 : 36;

    setPanelPos({ top: baseTop, left: baseLeft + offsetX });
  };

  return (
    <div ref={containerRef} className={s.container}>
      <LeftPanel onChipClick={handleChipClick} />

      {!panelPos && (
        <div style={{ maxHeight: '48.2rem', width: '100%' }}>
          <RightPanel />
        </div>
      )}

      {panelPos && (
        <div
          ref={panelRef}
          style={{
            position: 'absolute',
            top: panelPos.top,
            left: panelPos.left,
            width: 'calc(100% - 37.1rem - 2rem)',
          }}
        >
          <RightPanel />
        </div>
      )}
    </div>
  );
}
