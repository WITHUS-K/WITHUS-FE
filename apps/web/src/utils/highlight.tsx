import React from 'react';
import { vars } from '@repo/theme';

export function highlight(text: string, keyword: string) {
  if (!keyword) return <>{text}</>;

  const re = new RegExp(
    `(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi'
  );
  const parts = String(text).split(re);

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <span
            key={i}
            style={{
              color: vars.colors.white,
              backgroundColor: vars.colors.primary50,
            }}
          >
            {part}
          </span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
