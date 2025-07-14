'use client';

import React from 'react';
import { Callout } from '@repo/ui/Callout';
import * as styles from './EvalBubbles.css';
import { getProfileBackground, getProfileTextColor } from '@web/utils/color';

export interface Evaluator {
  name: string;
  profileColor: string;
}

interface Props {
  evaluators: Evaluator[];
  maxVisible?: number;
  size?: number;
  overlap?: number;
}

export default function EvalBubbles({
  evaluators,
  maxVisible = 9,
  size = 24,
  overlap = 20,
}: Props) {
  const visible = evaluators.slice(0, maxVisible);
  const hidden = evaluators.slice(maxVisible);

  const wrapperWidth = (visible.length - 1) * overlap + size;

  return (
    <div
      className={styles.wrapper}
      style={{ width: wrapperWidth, height: size }}
    >
      {visible.map((ev, i) => {
        const left = i * overlap;
        const offsetX = left + size / 2;

        return (
          <Callout
            key={ev.name}
            trigger={
              <div
                className={styles.bubble}
                style={{
                  backgroundColor: getProfileBackground(ev.profileColor),
                  color: getProfileTextColor(ev.profileColor),
                  width: size,
                  height: size,
                  left,
                  fontSize: size * 0.5,
                  zIndex: visible.length - i,
                }}
              >
                {ev.name.charAt(1)}
              </div>
            }
            texts={ev.name}
            position="top"
            offsetX={offsetX}
          />
        );
      })}

      {hidden.length > 0 && (
        <Callout
          trigger={
            <div
              className={styles.bubble}
              style={{
                color: '#747693',
                backgroundColor: '#A9ABC0',
                width: size,
                height: size,
                left: visible.length * overlap,
                zIndex: visible.length - visible.length,
              }}
            >
              +{hidden.length}
            </div>
          }
          texts={hidden.map((e) => e.name)}
          position="top"
          offsetX={visible.length * overlap + size / 2}
        />
      )}
    </div>
  );
}
